<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const clients = ref<AppClient[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchClients = async () => {
  isLoading.value = true
  error.value = null
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'
    const response = await fetch(`${baseUrl}/backoffice/apps`)
    if (!response.ok) {
      throw new Error(`Failed to fetch clients: ${response.statusText}`)
    }
    const data = await response.json()
    clients.value = Array.isArray(data) ? data : (data.data || [])
  } catch (err: any) {
    console.error('Error fetching clients:', err)
    error.value = err.message || 'An unknown error occurred.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchClients()
})



const searchQuery = ref('')

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value

  const query = searchQuery.value.toLowerCase()
  return clients.value.filter(client =>
    (client.app_name || '').toLowerCase().includes(query) ||
    (client.app_id || '').toLowerCase().includes(query)
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
  <div class="flex flex-col w-full min-h-screen bg-slate-50/50">
    <!-- Topbar Navigation -->
    <header class="sticky top-0 z-30 flex items-center h-16 gap-4 px-6 border-b shadow-sm bg-background">
      <div class="flex items-center gap-2 font-semibold">
        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <TerminalSquare class="w-5 h-5" />
        </div>
        <span class="text-lg tracking-tight">Ressonance API</span>
      </div>
      <div class="flex items-center gap-4 ml-auto">
        <Avatar class="w-8 h-8 border">
          <AvatarImage src="" alt="@admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 w-full p-6 mx-auto md:p-10 lg:p-12 max-w-7xl">
      <div class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">Clients (Apps)</h1>
          <p class="mt-1 text-slate-500">Manage connected applications and their API credentials.</p>
        </div>
      </div>

      <Card class="overflow-hidden shadow-sm border-slate-200">
        <CardHeader class="px-6 pt-5 pb-4 border-b bg-slate-50/50">
          <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <CardTitle class="flex items-center gap-2 text-lg font-semibold">
              <Building2 class="w-5 h-5 text-slate-400" />
              Registered Applications
            </CardTitle>
            <div class="relative w-full sm:w-72">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                v-model="searchQuery"
                type="search"
                placeholder="Search by name or ID..."
                class="w-full bg-white shadow-sm pl-9 border-slate-200 focus-visible:ring-primary/20"
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
                <TableHead class="font-medium">User Email</TableHead>
                <TableHead class="hidden font-medium md:table-cell">Current Connections</TableHead>
                <TableHead class="hidden font-medium md:table-cell">Messages Sent (Month)</TableHead>
                <TableHead class="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="!isLoading && !error">
              <TableRow v-for="client in filteredClients" :key="client.app_id" class="group">
                <TableCell>
                  <div class="flex items-center gap-3">
                    <Avatar class="border shadow-sm h-9 w-9 border-slate-200">
                      <AvatarFallback class="font-medium bg-primary/5 text-primary">
                        {{ getInitials(client.app_name || '?') }}
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                      <span class="font-semibold text-slate-900">{{ client.app_name }}</span>

                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <code class="relative rounded bg-slate-100 px-[0.4rem] py-[0.3rem] font-mono text-sm font-medium text-slate-700">
                      {{ client.app_id }}
                    </code>
                    <Button variant="ghost" size="icon" class="w-6 h-6 transition-opacity opacity-0 text-slate-400 hover:text-slate-900 group-hover:opacity-100" @click="copyToClipboard(client.app_id)">
                      <Copy class="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center text-sm text-slate-600">
                    {{ client.user_email || 'No email' }}
                  </div>
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
                    <span class="font-medium text-slate-700">{{ client.messages_sent?.toLocaleString() || 0 }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="h-8 w-8 p-0 text-slate-500 hover:text-slate-900 data-[state=open]:bg-slate-100">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-[160px]">
                      <DropdownMenuLabel class="text-xs font-normal tracking-wider uppercase text-slate-500">Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="flex items-center gap-2 cursor-pointer" @click="copyToClipboard(client.app_id)">
                        <Copy class="w-4 h-4 text-slate-400" />
                        Copy App ID
                      </DropdownMenuItem>
                      <DropdownMenuItem class="flex items-center gap-2 cursor-pointer">
                        <Edit3 class="w-4 h-4 text-slate-400" />
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="flex items-center gap-2 text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700">
                        <Trash2 class="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              </template>
              <TableRow v-if="isLoading">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-slate-500">
                    <p class="font-medium text-slate-900">Loading clients...</p>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow v-if="error">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-red-500">
                    <p class="font-medium">Error loading clients</p>
                    <p class="text-sm">{{ error }}</p>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow v-if="!isLoading && !error && filteredClients.length === 0">
                <TableCell colspan="6" class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-slate-500">
                    <Search class="w-8 h-8 mb-2 text-slate-300" />
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