import { ModeToggle } from '@/components/mode-toggle';

const Settings = () => {
  return (
    <section className="mx-2 my-2">
      <div className="flex items-center justify-between mb-2 mt-16">
        <div>
          <h1 className="text-lg font-medium">Settings</h1>
          <p className="text-muted-foreground text-sm font-normal">
            Manage your account settings and personal preferences.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium">Theme</h4>
        <div>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
};

export default Settings;
