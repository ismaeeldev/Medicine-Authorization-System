"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Trash2, Plus, Loader2, Building, RefreshCw, Barcode, Edit } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { playSuccessSound, playErrorSound, playTapSound } from "@/lib/audio"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    serial: z.string().min(4, {
        message: "Serial number must be at least 4 characters.",
    }),
})

type CompanyType = {
    _id: string;
    name: string;
    serial: string;
    createdAt: string;
}

export function CompanyClient() {
    const [companies, setCompanies] = useState<CompanyType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [editingCompany, setEditingCompany] = useState<CompanyType | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            serial: "",
        },
    })

    const editForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            serial: "",
        },
    })

    const openEditDialog = (company: CompanyType) => {
        setEditingCompany(company)
        editForm.reset({
            name: company.name,
            serial: company.serial
        })
        setIsEditDialogOpen(true)
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const fetchCompanies = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/companies')
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setCompanies(data)
        } catch (error) {
            toast.error("Failed to load companies")
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch('/api/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to add company")
            }

            playSuccessSound()
            toast.success("Company registered successfully")
            form.reset()
            fetchCompanies()
        } catch (error: any) {
            playErrorSound()
            toast.error(error.message)
        }
    }

    async function onEditSubmit(values: z.infer<typeof formSchema>) {
        if (!editingCompany) return;
        try {
            const res = await fetch(`/api/companies/${editingCompany._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to update company")
            }

            playSuccessSound()
            toast.success("Company updated successfully")
            setIsEditDialogOpen(false)
            fetchCompanies()
        } catch (error: any) {
            playErrorSound()
            toast.error(error.message)
        }
    }

    const deleteCompany = async (id: string) => {
        setIsDeleting(id)
        try {
            const res = await fetch(`/api/companies/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error("Failed to delete")

            playTapSound()
            toast.success("Company deleted successfully")
            fetchCompanies()
        } catch (error) {
            playErrorSound()
            toast.error("Failed to delete company")
        } finally {
            setIsDeleting(null)
        }
    }

    return (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:grid-cols-[350px_1fr] items-start">
            {/* Add Company Form */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sticky top-24">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5 text-primary" />
                        Add New Company
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Enter the details to register an authorized serial.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground/80">Company Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Enter company name" className="pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="serial"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground/80">Serial / Barcode Number</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Barcode className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="e.g. 123456789" className="pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 transition-all duration-300">
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Register Company"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Companies List */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Registered Companies</CardTitle>
                        <CardDescription className="text-xs">A list of all authorized medicine companies.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={fetchCompanies} disabled={isLoading} className="text-muted-foreground hover:text-primary">
                        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-white/10 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="font-semibold text-foreground/80">Company Name</TableHead>
                                    <TableHead className="font-semibold text-foreground/80 ">Serial No.</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-foreground/80 text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i} className="border-white/5">
                                            <TableCell><Skeleton className="h-5 w-[150px] bg-white/10" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[100px] bg-white/10" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[80px] bg-white/10" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md bg-white/10" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : companies.length === 0 ? (
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableCell colSpan={4} className="h-48 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Building className="h-8 w-8 text-white/20" />
                                                <p>No companies found. Create one to get started.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <AnimatePresence>
                                        {companies.map((company, index) => (
                                            <motion.tr
                                                key={company._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, backgroundColor: "rgba(239,68,68,0.1)" }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                                className="border-white/5 hover:bg-white/5 transition-colors border-b last:border-0"
                                            >
                                                <TableCell className="font-medium text-foreground">{company.name}</TableCell>
                                                <TableCell className="text-muted-foreground font-mono text-sm">{company.serial}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                                        Authorized
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right whitespace-nowrap">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(company)}
                                                        className="text-blue-500/70 hover:text-blue-500 hover:bg-blue-500/10 mr-1"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isDeleting === company._id}
                                                        onClick={() => deleteCompany(company._id)}
                                                        className="text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        {isDeleting === company._id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Company Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-neutral-900 border-white/10 text-foreground">
                    <DialogHeader>
                        <DialogTitle>Edit Company</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Update the details for the authorized company.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...editForm}>
                        <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                            <FormField
                                control={editForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground/80">Company Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={editForm.control}
                                name="serial"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground/80">Serial / Barcode Number</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Barcode className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs text-destructive" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={editForm.formState.isSubmitting} className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 transition-all duration-300">
                                {editForm.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
