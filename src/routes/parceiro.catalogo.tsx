import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { Search, ShoppingCart, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/parceiro/catalogo")({
  head: () => ({ meta: [{ title: "Catálogo de Produtos — VIVAVERDE" }] }),
  component: ParceiroCatalogo,
});

function ParceiroCatalogo() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data } = await supabase
        .from("produtos")
        .select("id, nome, valor, imagem, emoji, descricao, codigo, status")
        .eq("status", "Ativo")
        .order("nome");
      if (data) setProdutos(data);
      setLoading(false);
    };
    fetchProdutos();
  }, []);

  const filtered = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleAddToCart = (produto: any) => {
    setAddedId(produto.id);
    setTimeout(() => setAddedId(null), 1200);
    navigate({ to: "/parceiro/pdv", search: { produto: produto.id } as any });
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-2">
          <Package className="h-6 w-6 text-brand" />
          Catálogo de Produtos
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Toque em um produto para adicioná-lo ao pedido.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou código…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 pl-10 rounded-xl bg-white shadow-sm border-0 ring-1 ring-slate-900/5"
        />
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-xs text-muted-foreground font-medium">
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden animate-pulse"
            >
              <div className="bg-slate-100 aspect-square" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
            🔍
          </div>
          <p className="font-semibold text-slate-700">Nenhum produto encontrado</p>
          <p className="text-sm text-muted-foreground">Tente buscar por outro nome ou código.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden flex flex-col active:scale-[0.97] transition-transform"
            >
              {/* Product Image */}
              <div className="aspect-square bg-accent relative overflow-hidden">
                {p.imagem ? (
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-60">
                    {p.emoji || "🪴"}
                  </div>
                )}
                {p.codigo && (
                  <span className="absolute top-2 left-2 bg-black/40 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                    {p.codigo}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1 gap-2">
                <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">
                  {p.nome}
                </p>
                {p.descricao && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                    {p.descricao}
                  </p>
                )}
                <p className="text-base font-extrabold text-brand mt-auto">
                  R$ {Number(p.valor).toFixed(2).replace(".", ",")}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(p)}
                  className={`
                    w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition-all
                    ${addedId === p.id
                      ? "bg-emerald-500 text-white scale-95"
                      : "bg-gradient-brand text-primary-foreground active:scale-95"
                    }
                  `}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {addedId === p.id ? "Adicionado!" : "Pedir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
