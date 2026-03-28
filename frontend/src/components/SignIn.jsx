import { useState } from "react";
import UpdateUser from "./UpdateUser";
import AccountForms from "./AccountForms";
import ForgotPassword from "./ForgotPassword";
import DeleteAccount from "./DeleteAccount";
import CollapsibleSection from "./CollapsibleSection";

const SignIn = ({ onSignupSuccess }) => {
  const [openSection, setOpenSection] = useState(null)
  const [sectionKeys, setSectionKeys] = useState({
    invitation: 0,
    update: 0,
    forgot: 0,
    delete: 0,
  })

  const toggleSection = (section) => {
    setOpenSection((current) => {
      if (current === section) {
        setSectionKeys((keys) => ({ ...keys, [section]: keys[section] + 1 }))
        return null
      }

      if (current) {
        setSectionKeys((keys) => ({ ...keys, [current]: keys[current] + 1 }))
      }

      return section
    })
  }

  return (
    <div className="py-8">
      <div className="flex w-full flex-col gap-10 items-stretch">
        <CollapsibleSection
          title="Invitation & Signup"
          emoji="✉️"
          open={openSection === 'invitation'}
          onToggle={() => toggleSection('invitation')}
        >
          <AccountForms key={sectionKeys.invitation} onSignupSuccess={onSignupSuccess} />
        </CollapsibleSection>
        <CollapsibleSection
          title="Update Password"
          emoji="🔒"
          open={openSection === 'update'}
          onToggle={() => toggleSection('update')}
        >
          <UpdateUser key={sectionKeys.update} />
        </CollapsibleSection>
        <CollapsibleSection
          title="Forgot Password"
          emoji="🪄"
          open={openSection === 'forgot'}
          onToggle={() => toggleSection('forgot')}
        >
          <ForgotPassword key={sectionKeys.forgot} />
        </CollapsibleSection>
        <CollapsibleSection
          title="Delete Account"
          emoji="🗑️"
          open={openSection === 'delete'}
          onToggle={() => toggleSection('delete')}
        >
          <DeleteAccount key={sectionKeys.delete} />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default SignIn;
