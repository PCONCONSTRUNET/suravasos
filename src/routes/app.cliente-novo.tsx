import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cliente-novo")({
  head: () => ({ meta: [{ title: "Novo Cliente — VIVAVERDE ERP" }] }),
  component: NovoCliente,
});

function NovoCliente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [cliente, setCliente] = useState({
    nome: "",
    cpf_cnpj: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    status: "Ativo"
  });

  const handleSalvar = async () => {
    if (!cliente.nome) {
      alert("Preencha o nome do cliente.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('clientes').insert([cliente]);
      if (error) throw error;
      
      navigate({ to: "/app/clientes" });
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Novo Cliente" subtitle="Cadastre um novo cliente no sistema" actions={
        <>
          <Button variant="outline" asChild><Link to="/app/clientes"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Link></Button>
          <Button className="bg-gradient-brand text-primary-foreground" onClick={handleSalvar} disabled={loading}>
            <Save className="mr-2 h-4 w-4" /> {loading ? "Salvando..." : "Salvar Cliente"}
          </Button>
        </>
      } />

      <Card className="shadow-card p-6 max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome / Razão Social</Label>
              <Input value={cliente.nome} onChange={e => setCliente({...cliente, nome: e.target.value})} placeholder="Ex: Jardim Verde Ltda" />
            </div>
            <div className="space-y-2">
              <Label>CPF / CNPJ (Opcional)</Label>
              <Input value={cliente.cpf_cnpj} onChange={e => setCliente({...cliente, cpf_cnpj: e.target.value})} placeholder="000.000.000-00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input value={cliente.telefone} onChange={e => setCliente({...cliente, telefone: e.target.value})} placeholder="(11) 90000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={cliente.status} 
                onChange={e => setCliente({...cliente, status: e.target.value})}
              >
                <option>Ativo</option>
                <option>Premium</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4 mt-4">
            <h4 className="font-semibold text-sm text-muted-foreground">Endereço (Opcional)</h4>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-1">
                <Label>CEP</Label>
                <Input value={cliente.cep} onChange={e => setCliente({...cliente, cep: e.target.value})} placeholder="00000-000" />
              </div>
              <div className="space-y-2 col-span-3">
                <Label>Logradouro / Endereço</Label>
                <Input value={cliente.endereco} onChange={e => setCliente({...cliente, endereco: e.target.value})} placeholder="Ex: Rua das Flores" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
               <div className="space-y-2 col-span-1">
                <Label>Número</Label>
                <Input value={cliente.numero} onChange={e => setCliente({...cliente, numero: e.target.value})} placeholder="123" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label>Bairro</Label>
                <Input value={cliente.bairro} onChange={e => setCliente({...cliente, bairro: e.target.value})} placeholder="Centro" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label>Cidade</Label>
                <Input value={cliente.cidade} onChange={e => setCliente({...cliente, cidade: e.target.value})} placeholder="Ex: São Paulo" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label>UF</Label>
                <Input value={cliente.uf} onChange={e => setCliente({...cliente, uf: e.target.value})} placeholder="Ex: SP" maxLength={2} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
