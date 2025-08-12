import NavBar from "../navbar";

export default function DefaultScreenLayout(props: any) {
    return (
        <main className="flex bg-gray-100 flex-col w-full h-lvh overflow-hidden md:flex-row" >
            <NavBar screen={props.screen} />
            {props.loadingText ?
                <div className="h-full w-full p-6 overflow-y-auto flex items-center justify-center">
                    <h2 className="text-secondary-light font-semibold text-center md:w-1/3 md:text-xl">
                        {props.loadingText}
                    </h2>
                </div>
                :
                <div className="w-full p-6 overflow-y-auto">
                    {props.children}
                </div>
            }
        </main>
    );
}