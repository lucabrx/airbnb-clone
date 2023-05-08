import z from "zod"

export const RentalSchema = z.object({
    category: z.string(),
    location: z.string(),
    guestCount: z.number(),
    roomCount: z.number(),
    bathroomCount: z.number(),
    imageSrc: z.string(),
    price: z.number(),
    description: z.string()
})

export type RentalType = z.infer<typeof RentalSchema>