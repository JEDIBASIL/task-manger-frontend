interface PageHeader {
    name: string;
    emoji: string;
}

const App: React.FC<PageHeader> = ({ emoji, name }) => {
    return (
        <>
            <div>
                <h1><span>{emoji} {name}</span></h1>
            </div>
        </>
    );
};

export default App;
