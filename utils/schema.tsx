import { pgTable,serial,varchar,text, boolean, } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('AIOutput', {
    id: serial('id').primaryKey(), 
    FormData: varchar('FormData', { length: 255 }).notNull(), 
    aiResponse: text('aiResponse'), 
    templateSlug: varchar('templateSlug', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }),
});

export const UserSub = pgTable('userSubscription', {
    id:serial("id").primaryKey(),
    email:varchar("email"),
    userName:varchar('userName'),
    active:boolean('active'),
    paymentId:varchar('paymentId'),
    joinData:varchar('joinData')
})