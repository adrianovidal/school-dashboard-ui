import Announcements from "@/components/Announcements"
import BigCalendarContainer from "@/components/containers/BigCalendarContainer"
import EventCalendar from "@/components/EventCalendar"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

const StudentPage = async () => {
    const userId = await currentUser()

    const classItem = await prisma.class.findMany({
        where: {
            students: {some: { id: userId?.id! } }
        }
    })

    return (
        <div className="p-4 flex flex-col gap-4 xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    <BigCalendarContainer type="classId" id={classItem[0].id} />
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}

export default StudentPage