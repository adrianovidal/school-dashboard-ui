import Announcements from "@/components/Announcements"
import BigCalendarContainer from "@/components/containers/BigCalendarContainer"
import { currentUser } from "@clerk/nextjs/server"

const TeacherPage = async () => {
    const user = await currentUser()

    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule</h1>
                    <BigCalendarContainer type="teacherId" id={user?.id!}  />
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <Announcements />
            </div>
        </div>
    )
}

export default TeacherPage