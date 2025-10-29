"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  email: z.email({message: "Invalid email address!"}),
  studentsNames: z.string().min(1, "Informe pelo menos um nome"),
  phone: z.string().min(1, {message: "Phone number is required!"}),
  address: z.string().min(1, {message: "Address is required!"}),
});

type FormData = z.infer<typeof schema>;

const ParentForm = ({type, data, setOpen, relatedData}:{
    type: "create" | "update";
    data: any,
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Create a new parent</h1>
            <span className="text-xs text-gray-400 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
                <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-xs text-gray-500">Students Names</label>
                <input type="text" {...register("studentsNames")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" defaultValue={data?.studentsNames}/>
                {errors.studentsNames?.message && <p className="text-xs text-red-400">{errors.studentsNames?.message}</p>}
            </div>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} />
                <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors?.address} />                
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ParentForm