import GeneralInformation from "@/app/components-local/ui/profile/general-information";
import ProfileResetPassword from "@/app/components-local/ui/profile/profile-reset-password";

const ProfilePage = () => {
    return (
        <main className="flex flex-col w-full md:p-7 gap-y-7">
            <GeneralInformation />
            <ProfileResetPassword />
        </main>
    )
}

export default ProfilePage;