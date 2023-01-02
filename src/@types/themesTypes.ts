export interface UserTheme {
    id: string;
    name: string;
    colors: {
        body: string;
        text: string;
        button: {
            text: string;
            background: string;
        };
        link: {
            text: string;
            background: string;
        };
    };
    font: string;
}
