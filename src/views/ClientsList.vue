<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AppClient } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Search, Building2, TerminalSquare, Copy, Edit3, Trash2 } from 'lucide-vue-next'

// Mock Data
const clients = ref<AppClient[]>([
  {
    id: 1,
    user_id: 101,
    app_name: 'E-commerce Brasil',
    app_language_choice: 'pt-BR',
    app_id: 'app_12345',
    app_key: 'key_abc123',
    app_secret: 'sec_xyz987',
    created_at: '2023-10-27T10:00:00Z',
    updated_at: '2023-10-27T10:00:00Z',
    current_connections: 5,
    messages_sent_month: 1250,
  },
  {
    id: 2,
    user_id: 102,
    app_name: 'Tech Blog Pro',
    app_language_choice: 'en',
    app_id: 'app_67890',
    app_key: 'key_def456',
    app_secret: 'sec_uvw654',
    created_at: '2023-10-28T14:30:00Z',
    updated_at: '2023-10-29T09:15:00Z',
    current_connections: 12,
    messages_sent_month: 8400,
  },
  {
    id: 3,
    user_id: 103,
    app_name: 'ERP Corp Solutions',
    app_language_choice: 'es',
    app_id: 'app_11223',
    app_key: 'key_ghi789',
    app_secret: 'sec_rst321',
    created_at: '2023-11-01T08:45:00Z',
    updated_at: '2023-11-01T08:45:00Z',
    current_connections: 3,
    messages_sent_month: 420,
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

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase()
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  // In a real app we would add a toast notification here
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/50 flex flex-col w-full">
    <!-- Topbar Navigation -->
    <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
      <div class="flex items-center gap-2 font-semibold">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TerminalSquare class="h-5 w-5" />
        </div>
        <span class="text-lg tracking-tight">Ressonance API</span>
      </div>
      <div class="ml-auto flex items-center gap-4">
        <Avatar class="h-8 w-8 border">
          <AvatarImage src="" alt="@admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">Clients (Apps)</h1>
          <p class="text-slate-500 mt-1">Manage connected applications and their API credentials.</p>
        </div>
      </div>

      <Card class="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader class="border-b bg-slate-50/50 pb-4 pt-5 px-6">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle class="text-lg font-semibold flex items-center gap-2">
              <Building2 class="w-5 h-5 text-slate-400" />
              Registered Applications
            </CardTitle>
            <div class="relative w-full sm:w-72">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                v-model="searchQuery"
                type="search"
                placeholder="Search by name or ID..."
                class="w-full pl-9 bg-white shadow-sm border-slate-200 focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent class="p-0">
          <Table>
            <TableHeader class="bg-slate-50/50 text-slate-500">
              <TableRow class="hover:bg-transparent">
                <TableHead class="w-[300px] font-medium">App Name</TableHead>
                <TableHead class="font-medium">App ID</TableHead>
                <TableHead class="font-medium">Language</TableHead>
                <TableHead class="font-medium hidden md:table-cell">Current Connections</TableHead>
                <TableHead class="font-medium hidden md:table-cell">Messages Sent (Month)</TableHead>
                <TableHead class="text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="client in filteredClients" :key="client.id" class="group">
                <TableCell>
                  <div class="flex items-center gap-3">
                    <Avatar class="h-9 w-9 border border-slate-200 shadow-sm">
                      <AvatarFallback class="bg-primary/5 text-primary font-medium">
                        {{ getInitials(client.app_name) }}
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                      <span class="font-semibold text-slate-900">{{ client.app_name }}</span>
                      <span class="text-xs text-slate-500 hidden sm:inline-block">Internal ID: {{ client.id }}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <code class="relative rounded bg-slate-100 px-[0.4rem] py-[0.3rem] font-mono text-sm font-medium text-slate-700">
                      {{ client.app_id }}
                    </code>
                    <Button variant="ghost" size="icon" class="h-6 w-6 text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" @click="copyToClipboard(client.app_id)">
                      <Copy class="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" class="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">
                    {{ client.app_language_choice }}
                  </Badge>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1.5 text-xs text-slate-500">
                      <span class="font-medium text-slate-700">{{ client.current_connections || 0 }}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  <div class="flex items-center gap-1.5 text-xs text-slate-500">
                    <span class="font-medium text-slate-700">{{ client.messages_sent_month?.toLocaleString() || 0 }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 data-[state=open]:bg-slate-100">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-[160px]">
                      <DropdownMenuLabel class="font-normal text-xs text-slate-500 uppercase tracking-wider">Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="cursor-pointer flex items-center gap-2" @click="copyToClipboard(client.app_id)">
                        <Copy class="h-4 w-4 text-slate-400" />
                        Copy App ID
                      </DropdownMenuItem>
                      <DropdownMenuItem class="cursor-pointer flex items-center gap-2">
                        <Edit3 class="h-4 w-4 text-slate-400" />
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="cursor-pointer flex items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-700">
                        <Trash2 class="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow v-if="filteredClients.length === 0">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-slate-500">
                    <Search class="h-8 w-8 mb-2 text-slate-300" />
                    <p class="font-medium text-slate-900">No clients found.</p>
                    <p class="text-sm">Your search returned no results.</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
