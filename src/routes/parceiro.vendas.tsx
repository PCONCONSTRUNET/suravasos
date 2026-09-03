import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { Loader2, PackageOpen, FileText, Search, X, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/parceiro/vendas")({
  head: () => ({ meta: [{ title: "Minhas Vendas — VIVAVERDE" }] }),
  component: VendasParceiro,
});

function VendasParceiro() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  
  useEffect(() => {
    async function fetchVendas() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        const { data: vendedor } = await supabase
          .from("vendedores")
          .select("id")
          .eq("user_id", session.user.id)
          .single();
          
        if (vendedor) {
          const { data, error } = await supabase
            .from("vendas")
            .select("*, clientes(nome)")
            .eq("vendedor_id", vendedor.id)
            .order("created_at", { ascending: false });
            
          if (data) setVendas(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchVendas();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'aprovado':
      case 'aceito':
      case 'pago':
      case 'entregue':
      case 'faturado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejeitado':
      case 'cancelado':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const deleteVenda = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este pedido? Essa ação não pode ser desfeita.")) return;
    
    try {
      const { error } = await supabase.from("vendas").delete().eq("id", id);
      if (error) throw error;
      setVendas(prev => prev.filter(v => v.id !== id));
    } catch (err: any) {
      alert("Erro ao excluir pedido: " + err.message);
    }
  };

  const filteredVendas = vendas.filter(v => {
    let matchesSearch = true;
    let matchesDate = true;
    
    if (searchTerm) {
      const nome = (v.clientes?.nome || "").toLowerCase();
      matchesSearch = nome.includes(searchTerm.toLowerCase());
    }
    
    if (selectedDate) {
      matchesDate = v.created_at.startsWith(selectedDate);
    }
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-800">Minhas Vendas</h1>
        <p className="text-sm text-muted-foreground mt-1">Acompanhe o histórico e status dos seus pedidos.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 h-11 bg-white border-slate-200 rounded-xl"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative w-full sm:w-auto">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-11 bg-white border-slate-200 rounded-xl w-full sm:w-[160px]"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand" />
        </div>
      ) : vendas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-600">Nenhuma venda encontrada</p>
          <p className="text-sm text-muted-foreground">Suas vendas aparecerão aqui após você enviar um pedido no PDV.</p>
        </div>
      ) : filteredVendas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-600">Nenhum resultado encontrado</p>
          <p className="text-sm text-muted-foreground">Tente buscar por outro cliente ou data.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVendas.map((v) => (
            <div key={v.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                      {v.clientes?.nome || "Cliente não informado"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(v.created_at).toLocaleDateString('pt-BR')} às {new Date(v.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteVenda(v.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Excluir pedido"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="border-t border-dashed my-1 border-slate-200"></div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Valor Total</p>
                  <p className="font-black text-brand text-lg">R$ {Number(v.valor_total || 0).toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {v.status_aprovacao && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(v.status_aprovacao)}`}>
                      Aprovação: {v.status_aprovacao}
                    </span>
                  )}
                  {v.status && v.status !== v.status_aprovacao && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(v.status)}`}>
                      Pedido: {v.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
