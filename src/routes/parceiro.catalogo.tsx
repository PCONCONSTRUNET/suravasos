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
    // Garante sessão ativa antes de buscar produtos (igual ao PDV)
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate({ to: "/parceiro/login" });
        return;
      }

      let aplicaAcrescimo = false;
      let percentual = 20;
      const { data: vData } = await supabase
        .from("vendedores")
        .select("acrescimo_catalogo, acrescimo_catalogo_percentual")
        .eq("user_id", session.user.id)
        .single();
      
      if (vData) {
        aplicaAcrescimo = vData.acrescimo_catalogo;
        if (vData.acrescimo_catalogo_percentual !== null && vData.acrescimo_catalogo_percentual !== undefined) {
          percentual = Number(vData.acrescimo_catalogo_percentual);
        }
      }

      // Mesma query usada no parceiro.pdv.tsx
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("status", "Ativo")
        .order("nome");

      if (error) console.error("[catalogo] erro ao buscar produtos:", error);
      if (data) {
        const multiplier = 1 + (percentual / 100);
        const produtosComPreco = data.map((prod: any) => ({
          ...prod,
          valor: aplicaAcrescimo ? prod.valor * multiplier : prod.valor
        }));
        setProdutos(produtosComPreco);
      }
      setLoading(false);
    };
    init();
  }, []);

  const filtered = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.codigo && p.codigo.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handlePedir = (produto: any) => {
    setAddedId(produto.id);
    setTimeout(() => {
      setAddedId(null);
      // Passa o produto pela URL query — igual ao PDV espera
      window.location.href = `/parceiro/pdv?produto=${produto.id}`;
    }, 600);
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-2">
          <Package className="h-6 w-6 text-brand" />
          Catálogo de Produtos
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Toque em um produto para iniciar um pedido.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou código…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 pl-10 rounded-xl bg-white shadow-sm border-0 ring-1 ring-slate-900/5"
        />
      </div>

      {/* Count badge */}
      {!loading && (
        <p className="text-xs text-muted-foreground font-medium">
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Loading skeleton */}
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
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-9 bg-slate-100 rounded-xl w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
            {searchTerm ? "🔍" : "📦"}
          </div>
          <p className="font-semibold text-slate-700">
            {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchTerm
              ? "Tente buscar por outro nome ou código."
              : "Os produtos serão exibidos aqui quando cadastrados no sistema."}
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden flex flex-col"
            >
              {/* Imagem */}
              <div className="aspect-square bg-slate-50 relative overflow-hidden">
                {p.imagem ? (
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl select-none">
                    {p.emoji || "🪴"}
                  </div>
                )}
                {/* Código badge */}
                {p.codigo && (
                  <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                    {p.codigo}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1 gap-1.5">
                {/* Nome — somente leitura, não editável */}
                <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2 select-none">
                  {p.nome}
                </p>

                {p.descricao && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug select-none">
                    {p.descricao}
                  </p>
                )}

                {/* Preço */}
                <p className="text-base font-extrabold text-brand mt-auto select-none">
                  R$ {Number(p.valor).toFixed(2).replace(".", ",")}
                </p>

                {/* Botão Pedir */}
                <button
                  onClick={() => handlePedir(p)}
                  disabled={addedId === p.id}
                  className={`
                    w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold
                    transition-all duration-200 active:scale-95 select-none
                    ${addedId === p.id
                      ? "bg-emerald-500 text-white opacity-90 scale-95"
                      : "bg-gradient-brand text-primary-foreground hover:opacity-90"
                    }
                  `}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {addedId === p.id ? "Abrindo…" : "Pedir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
