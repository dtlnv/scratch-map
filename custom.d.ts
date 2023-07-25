declare module "assets/swg-maps/*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.scss" {
    const content: any;
    export default content;
}

declare module "*.json" {
    const content: any;
    export default content;
}
