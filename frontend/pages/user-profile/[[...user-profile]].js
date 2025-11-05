import { UserProfile } from '@clerk/nextjs';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const CustomPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-accent">Custom Page</h1>
      <p className="text-textSecondary">This is the content of the custom page.</p>
    </div>
  );
};

const UserProfilePage = () => {
  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex items-center justify-center w-full mx-auto max-w-5xl">
          <UserProfile 
            path="/user-profile"
            routing="path"
            appearance={{
              baseTheme: undefined,
              variables: {
                colorPrimary: '#C9A961',
                colorBackground: '#232523ff',
                colorInputBackground: '#1F2328',
                colorInputText: '#E8E6E3',
                colorText: '#f7f5f2ff',
                colorTextSecondary: '#b4bed0ff',
                colorDanger: '#EF4444',
                colorWarning: '#F59E0B',
                colorSuccess: '#10B981',
                borderRadius: '0.75rem',
              },
              elements: {
                rootBox: "w-full",
                card: "bg-[#2A2E35] border-2 border-[#3D4451] shadow-2xl",
                navbar: "bg-[#1F2328] border-r border-[#3D4451]",
                navbarButton: "text-[#9CA3AF] hover:bg-[#3D4451] hover:text-[#E8E6E3]",
                navbarButtonActive: "text-[#C9A961] bg-[#3D4451] border-r-2 border-[#C9A961]",
                headerTitle: "text-[#E8E6E3] font-bold text-2xl",
                headerSubtitle: "text-[#9CA3AF]",
                profileSectionTitle: "text-[#E8E6E3] font-semibold",
                profileSectionPrimaryButton: "bg-[#C9A961] hover:bg-[#B89658] text-[#1F2328] font-semibold",
                formButtonPrimary: "bg-[#C9A961] hover:bg-[#B89658] text-[#1F2328] font-semibold shadow-lg hover:shadow-xl",
                formButtonReset: "text-[#9CA3AF] hover:text-[#E8E6E3] border-[#3D4451]",
                formFieldInput: "bg-[#1F2328] border-2 border-[#3D4451] text-[#E8E6E3] focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20",
                formFieldLabel: "text-[#E8E6E3] font-medium",
                formFieldInputShowPasswordButton: "text-[#C9A961] hover:text-[#B89658]",
                badge: "bg-[#C9A961] text-[#1F2328] font-italic font-medium",
                avatarBox: "border-2 border-[#C9A961]",
                identityPreviewText: "text-[#E8E6E3]",
                identityPreviewEditButton: "text-[#C9A961] hover:text-[#B89658]",
                accordionTriggerButton: "text-[#E8E6E3] hover:text-[#C9A961]",
                formHeaderTitle: "text-[#E8E6E3] font-bold",
                formHeaderSubtitle: "text-[#9CA3AF]",
                dividerLine: "bg-[#3D4451]",
                dividerText: "text-[#9CA3AF]",
                tableHead: "text-[#9CA3AF] bg-[#1F2328]",
                menuButton: "text-[#E8E6E3] hover:bg-[#3D4451]",
                menuItem: "text-[#E8E6E3] hover:bg-[#3D4451]",
              }
            }}
          >
            {/* You can pass the content as a component */}
            <UserProfile.Page label="Custom Page" labelIcon={<DotIcon />} url="custom-page">
              <CustomPage />
            </UserProfile.Page>

            {/* You can also pass the content as direct children */}
            <UserProfile.Page label="Terms" labelIcon={<DotIcon />} url="terms">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-accent">Custom Terms Page</h1>
                <p className="text-textSecondary">This is the content of the custom terms page.</p>
              </div>
            </UserProfile.Page>
            <UserProfile.Page label="Privacy Policy" labelIcon={<DotIcon />} url="privacy-policy">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-accent">Custom Privacy Policy Page</h1>
                <p className="text-textSecondary">This is the content of the custom privacy policy page.</p>
              </div>
            </UserProfile.Page>
          </UserProfile>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserProfilePage;