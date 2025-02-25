import { PasswordForm } from "./components/password-form";
import { ProfileForm } from "./components/profile-form";
import { ProfileHeader } from "./components/profile-header";
import { ProfilePicture } from "./components/profile-picture";
import { useProfile } from "./hooks/use-profile";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { DefaultFooter } from "@/components/ui/default-footer";
import { usePageTitle } from "@/hooks/use-page-title";
import { useTranslation } from "react-i18next";

export function ProfilePage() {
  const { t } = useTranslation();

  usePageTitle(t("profile.pageTitle"));
  const profile = useProfile();

  if (profile.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex flex-col gap-8">
          <ProfileHeader />
          <div className="flex flex-col gap-8">
            <ProfilePicture
              userData={profile.userData}
              onImageChange={profile.handleImageChange}
              onImageRemove={profile.handleImageRemove}
            />
            <ProfileForm form={profile.profileForm} onSubmit={profile.onProfileSubmit} />
            <PasswordForm
              form={profile.passwordForm}
              isConfirmPasswordVisible={profile.isConfirmPasswordVisible}
              isNewPasswordVisible={profile.isNewPasswordVisible}
              onSubmit={profile.onPasswordSubmit}
              onToggleConfirmPassword={() => profile.setIsConfirmPasswordVisible(!profile.isConfirmPasswordVisible)}
              onToggleNewPassword={() => profile.setIsNewPasswordVisible(!profile.isNewPasswordVisible)}
            />
          </div>
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
}
