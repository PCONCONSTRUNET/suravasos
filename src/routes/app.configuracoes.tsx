import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Shield, Users, User, Settings as Cog } from "lucide-react";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — SURA ERP" }] }),
  component: Configuracoes,
});

const users = [
  { n: "Marcos Silva", e: "marcos@suravasos.com.br", r: "Administrador", c: "bg-primary/10 text-primary" },
  { n: "Camila Torres", e: "camila@suravasos.com.br", r: "Financeiro", c: "bg-info/15 text-info" },
  { n: "Diego Oliveira", e: "diego@suravasos.com.br", r: "Vendedor", c: "bg-success/15 text-success" },
  { n: "Patrícia Souza", e: "patricia@suravasos.com.br", r: "Estoquista", c: "bg-terra/10 text-terra" },
];

function Configuracoes() {
  return (
    <>
      <PageHeader title="Configurações" subtitle="Empresa, usuários, permissões e integrações" />

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil"><User className="mr-1.5 h-4 w-4" />Perfil</TabsTrigger>
          <TabsTrigger value="usuarios"><Users className="mr-1.5 h-4 w-4" />Usuários</TabsTrigger>
          <TabsTrigger value="permissoes"><Shield className="mr-1.5 h-4 w-4" />Permissões</TabsTrigger>
          <TabsTrigger value="backup"><Database className="mr-1.5 h-4 w-4" />Backup</TabsTrigger>
          <TabsTrigger value="preferencias"><Cog className="mr-1.5 h-4 w-4" />Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Dados da empresa</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><Label>Razão social</Label><Input className="mt-1.5" defaultValue="SURA Vasos Indústria e Comércio Ltda" /></div>
              <div><Label>CNPJ</Label><Input className="mt-1.5" defaultValue="12.345.678/0001-99" /></div>
              <div><Label>Inscrição estadual</Label><Input className="mt-1.5" defaultValue="123.456.789.012" /></div>
              <div><Label>Regime tributário</Label><Input className="mt-1.5" defaultValue="Simples Nacional" /></div>
              <div className="md:col-span-2"><Label>Endereço</Label><Input className="mt-1.5" defaultValue="Rod. Marechal Rondon, KM 342 — Bauru/SP" /></div>
              <div><Label>Telefone</Label><Input className="mt-1.5" defaultValue="(14) 3344-5566" /></div>
              <div><Label>E-mail</Label><Input className="mt-1.5" defaultValue="contato@suravasos.com.br" /></div>
              <div className="md:col-span-2 flex justify-end">
                <Button className="bg-gradient-brand text-primary-foreground">Salvar alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="mt-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Usuários do sistema</CardTitle>
              <Button className="bg-gradient-brand text-primary-foreground">Adicionar usuário</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {users.map((u) => (
                <div key={u.e} className="flex items-center justify-between rounded-xl border p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground shrink-0">
                      {u.n.split(" ").map(x => x[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{u.n}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.e}</p>
                    </div>
                  </div>
                  <Badge className={`${u.c} border-0`}>{u.r}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes" className="mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Permissões por módulo</CardTitle><CardDescription>Defina o que cada perfil pode acessar</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {["Estoque", "Vendas", "Financeiro", "Fiscal", "Relatórios", "Configurações"].map((m) => (
                <div key={m} className="flex items-center justify-between rounded-xl border p-4">
                  <p className="font-semibold">{m}</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Visualizar</label>
                    <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Editar</label>
                    <label className="flex items-center gap-2 text-sm"><Switch /> Excluir</label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Backup automático</CardTitle><CardDescription>Último backup: hoje, 03:00 — sucesso ✓</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div><p className="font-semibold">Backup diário</p><p className="text-xs text-muted-foreground">Armazenado em nuvem com retenção de 90 dias</p></div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline">Baixar backup agora</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias" className="mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Preferências do sistema</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["Notificações por e-mail", "Notificações push", "Alertas de estoque crítico", "Resumo semanal por WhatsApp"].map((p) => (
                <div key={p} className="flex items-center justify-between rounded-xl border p-4">
                  <p className="font-semibold">{p}</p>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
