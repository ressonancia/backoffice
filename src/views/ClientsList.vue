<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AppClient } from '@/types'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Plus, Search } from 'lucide-vue-next'

// Mock Data
const clients = ref<AppClient[]>([
  {
    id: 1,
    user_id: 101,
    app_name: 'Minha Loja',
    app_language_choice: 'pt-BR',
    app_id: 'app_12345',
    app_key: 'key_abc123',
    app_secret: 'sec_xyz987',
    created_at: '2023-10-27T10:00:00Z',
    updated_at: '2023-10-27T10:00:00Z',
  },
  {
    id: 2,
    user_id: 102,
    app_name: 'Blog Pessoal',
    app_language_choice: 'en',
    app_id: 'app_67890',
    app_key: 'key_def456',
    app_secret: 'sec_uvw654',
    created_at: '2023-10-28T14:30:00Z',
    updated_at: '2023-10-29T09:15:00Z',
  },
  {
    id: 3,
    user_id: 103,
    app_name: 'Sistema ERP',
    app_language_choice: 'es',
    app_id: 'app_11223',
    app_key: 'key_ghi789',
    app_secret: 'sec_rst321',
    created_at: '2023-11-01T08:45:00Z',
    updated_at: '2023-11-01T08:45:00Z',
  }
])

const searchQuery = ref('')

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value

  const query = searchQuery.value.toLowerCase()
  return clients.value.filter(client =>
    client.app_name.toLowerCase().includes(query) ||
    client.app_id.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="container mx-auto py-10 px-4 md:px-0 max-w-5xl">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Clientes</h1>
        <p class="text-muted-foreground mt-1">Gerencie os clientes (Apps) conectados à API.</p>
      </div>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        Novo Cliente
      </Button>
    </div>

    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center space-x-2">
          <Search class="w-4 h-4 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            placeholder="Buscar cliente por nome ou ID..."
            class="max-w-sm border-0 focus-visible:ring-0 px-2 h-8"
          />
        </div>
      </CardHeader>

      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da App</TableHead>
              <TableHead>App ID</TableHead>
              <TableHead>Idioma</TableHead>
              <TableHead>Chave (Key)</TableHead>
              <TableHead class="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="client in filteredClients" :key="client.id">
              <TableCell class="font-medium">
                {{ client.app_name }}
              </TableCell>
              <TableCell class="font-mono text-sm">{{ client.app_id }}</TableCell>
              <TableCell>{{ client.app_language_choice }}</TableCell>
              <TableCell class="font-mono text-xs text-muted-foreground">{{ client.app_key }}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="w-8 h-8 p-0">
                      <span class="sr-only">Abrir menu</span>
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem @click="() => {}">Copiar ID</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem class="text-red-600">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredClients.length === 0">
              <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
