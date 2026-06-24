import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useConfirm } from "@/contexts/ConfirmContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/app/produtos")({
  head: () => ({ meta: [{ title: "Produtos — VIVAVERDE ERP" }] }),
  component: Produtos,
});

function Produtos() {
  const confirm = useConfirm();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("Todas");

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !(await confirm({
        description: "Tem certeza que deseja excluir este produto?",
        variant: "destructive",
      }))
    )
      return;
    try {
      const { error } = await supabase.from("produtos").delete().eq("id", id);
      if (error) throw error;
      fetchProducts(); // recarrega a lista
    } catch (err: any) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const ativos = products.filter((p) => p.status === "Ativo").length;
  const criticos = products.filter((p) => p.status === "Crítico").length;
  const inativos = products.filter((p) => p.status === "Inativo").length;

  const filteredProducts = products.filter((p) => {
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(busca.toLowerCase()));
    const matchCat = categoriaFilter === "Todas" || p.categoria === categoriaFilter;
    return matchBusca && matchCat;
  });

  return (
    <>
      <PageHeader
        title="Produtos"
        subtitle={`${products.length} SKUs cadastrados — atualizado agora`}
        actions={
          <>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button asChild className="bg-gradient-brand text-primary-foreground">
              <Link to="/app/produto-novo">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Total de itens", v: products.length, c: "text-primary" },
          { l: "Ativos", v: ativos, c: "text-success" },
          { l: "Estoque crítico", v: criticos, c: "text-warning" },
          { l: "Inativos", v: inativos, c: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.l} className="shadow-card">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.l}</p>
              <p className={`mt-1 font-display text-2xl font-bold ${s.c}`}>{s.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por código ou nome…"
              className="pl-9"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas categorias</SelectItem>
              {Array.from(new Set(products.map((p) => p.categoria).filter(Boolean)))
                .sort()
                .map((cat: any) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Status: Ativos
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum produto encontrado na busca.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.codigo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 overflow-hidden place-items-center rounded-lg bg-accent text-lg border">
                          {p.imagem ? (
                            <img
                              src={p.imagem}
                              alt={p.nome}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="opacity-50">{p.emoji || "📦"}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{p.nome}</p>
                          <p className="text-xs text-muted-foreground">SKU interno</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{p.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {Number(p.estoque).toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      R$ {Number(p.valor).toFixed(2).replace(".", ",")}
                    </TableCell>
                    <TableCell>
                      {p.status === "Ativo" ? (
                        <Badge className="bg-success/15 text-success hover:bg-success/20 border-0">
                          Ativo
                        </Badge>
                      ) : p.status === "Crítico" ? (
                        <Badge className="bg-warning/15 text-warning hover:bg-warning/20 border-0">
                          Crítico
                        </Badge>
                      ) : (
                        <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-0">
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <Link to="/app/produto-novo" search={{ id: p.id }}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
