interface PageHeader {
    name: string;
    emoji: string;
}

const App: React.FC<PageHeader> = ({ emoji, name }) => {
    return (
        <>
            <div className="page_header">
                <h2><span>{emoji} {name}</span></h2>
            </div>
        </>
    );
};

export default App;
