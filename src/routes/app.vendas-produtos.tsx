import { createFileRoute } from "@tanstack/react-router";
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
import { Search, Save, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vendas-produtos")({
  head: () => ({ meta: [{ title: "Desempenho de Produtos — VIVAVERDE ERP" }] }),
  component: VendasProdutos,
});

function VendasProdutos() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("Todas");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

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
      toast.error("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from("produtos")
        .update({ quantidade_vendas: editValue })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Quantidade atualizada com sucesso!");
      setEditingId(null);
      fetchProducts();
    } catch (err: any) {
      toast.error("Erro ao salvar: " + err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(busca.toLowerCase()));
    const matchCat = categoriaFilter === "Todas" || p.categoria === categoriaFilter;
    return matchBusca && matchCat;
  });

  const totalVendasGlobais = products.reduce((acc, p) => acc + (p.quantidade_vendas || 0), 0);

  return (
    <>
      <PageHeader
        title="Desempenho de Produtos"
        subtitle="Acompanhe e ajuste o número de vendas por produto"
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total de Produtos</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">{products.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Vendas Globais</p>
            <p className="mt-1 font-display text-2xl font-bold text-success">{totalVendasGlobais}</p>
          </CardContent>
        </Card>
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
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Qtd. Vendas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
                      R$ {Number(p.valor).toFixed(2).replace(".", ",")}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === p.id ? (
                        <div className="flex justify-end">
                          <Input 
                            type="number"
                            className="w-24 text-right h-8"
                            value={editValue}
                            onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                            min={0}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <span className="font-semibold text-lg">{p.quantidade_vendas || 0}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === p.id ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            Cancelar
                          </Button>
                          <Button size="sm" onClick={() => handleSave(p.id)}>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(p.id);
                            setEditValue(p.quantidade_vendas || 0);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
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
