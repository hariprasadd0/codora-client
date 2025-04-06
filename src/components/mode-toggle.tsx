import { useTheme } from '@/components/theme-provider';
import { Card } from './ui/card';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const theme = localStorage.getItem('vite-ui-theme');

  return (
    <div className="flex items-center gap-4 flex-wrap mt-2 px-2">
      <div className="flex flex-col gap-3">
        <Card
          onClick={() => setTheme('light')}
          className={`${
            theme === 'light' ? 'ring-2 ring-gray-400 ring-offset-2' : ''
          } flex flex-col bg-[#fafafabd] cursor-pointer  shadow-none rounded-md w-[150px] h-[100px] justify-end items-end `}
        >
          <div className="bg-white border border-b-0 border-r-0 border-gray-300  select-none w-28 h-20 rounded-tl-sm rounded-br-sm text-black p-3">
            Aa
          </div>
        </Card>
        <span className="text-sm text-muted-foreground">Light</span>
      </div>
      <div className="flex flex-col gap-3">
        <Card
          onClick={() => setTheme('dark')}
          className={`${
            theme === 'dark' ? 'ring-1 ring-gray-300 ring-offset-2' : ''
          } flex flex-col bg-black/50 cursor-pointer shadow-none rounded-md w-[150px] h-[100px] justify-end items-end`}
        >
          <div className="bg-black border border-b-0 border-r-0 border-gray-300  select-none w-28 h-20 rounded-tl-sm rounded-br-sm text-white p-3">
            Aa
          </div>
        </Card>
        <span className="text-sm text-muted-foreground">Dark</span>
      </div>
      <div className="flex flex-col gap-3">
        <Card
          onClick={() => setTheme('system')}
          className={`${
            theme === 'system' ? 'ring-1 ring-gray-300 ring-offset-2' : ''
          } flex  bg-black/50 cursor-pointer shadow-none rounded-md w-[150px] h-[100px] justify-end items-end`}
        >
          <div className="bg-black border border-b-0 border-r-0 border-gray-300  select-none w-20 h-20 rounded-tl-sm rounded-br-sm text-white p-3">
            Aa
          </div>
          <div className="bg-white border border-b-0 border-r-0 border-gray-300  select-none w-20 h-20 rounded-tl-sm rounded-br-sm text-black p-3">
            Aa
          </div>
        </Card>
        <span className="text-sm text-muted-foreground">System</span>
      </div>
    </div>
  );
}
