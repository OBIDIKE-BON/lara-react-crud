import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className=" fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <h2 className="truncate leading-tight font-semibold text-orange-700">
                    PrimetecH
                </h2>
            </div>
        </>
    );
}
