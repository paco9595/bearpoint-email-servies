'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SidePopUp from "@/components/common/sidePopUp";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

interface IFormInputs {
  name: string,
  organization: string,
  description: string,
}

export default function CreateNewProject() {
  const supabase = createClientComponentClient()
  const {toast} = useToast()
  const methods = useForm<IFormInputs>({})
  const { handleSubmit, control, reset } = methods
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [organizations, setOrganizations] = useState<{ name: string, id: string }[]>([])

  useEffect(() => {
    const getOrganizationData = async () => {
      const { data: organizations, error } = await supabase.from('organization').select('name, id')
      if (error) {
        console.log(error)
      }
      setOrganizations(organizations || [])
    }
    getOrganizationData()

  }, [])


  const onSubmit: SubmitHandler<IFormInputs> = async ({ name, organization, description }: IFormInputs) => {
    console.log({ name, organization, description })
    const { data, error } = await supabase.from('project').insert({
      name,
      description,
      id_organization: organization,
    })
    if(error) {
      toast({
        variant: 'destructive',
        description: "it ocurred an error when the project as created"
      })
    } else {
      toast({
        variant: 'default',
        description: "the project was created successfully"
      })

    }
    closeHandler()
  }
  const closeHandler = () => {
    reset({
      name: '',
      organization: '',
      description: '',
    })
    setIsOpen(false)
  }
  return (
    <>
      <Button className="px-2 py-1 h-7 text-xs font-light" onClick={() => setIsOpen(true)}>
        New project
      </Button>
      {isOpen && (
        <SidePopUp clickOutside={closeHandler} title={'Create new project'}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="w-full max-w-sm my-8">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} placeholder="name" className="w-full" />}
                />
              </div>
              <div className="w-full max-w-sm my-8">
                <FormField
                  control={control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Organization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {organizations.map(({ name, id }) => (
                            <SelectItem key={id} value={id} className="capitalize">{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full max-w-sm my-8">
                <Label htmlFor="name">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Textarea {...field} placeholder="Description" />}
                />

              </div>
              <div className="flex-1 flex justify-end mt-4">
                <Button className="ml-2 px-2 py-1 h-7 text-xs font-normal" onClick={() => reset()} variant={"secondary"}>cancel</Button>
                <Button className="ml-2 px-2 py-1 h-7 text-xs font-normal" type="submit">Submit</Button>
              </div>
            </form>
          </FormProvider>
        </SidePopUp>
      )}
    </>
  )
}