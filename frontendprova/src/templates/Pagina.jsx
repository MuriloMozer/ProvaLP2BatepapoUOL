import Cabecalho from "./Cabecalho";
import Menu from "../componentes/Menu.jsx";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo='Bate-papo UOL' />
            <Menu />
            <div>
                {
                    //filhos/children
                }
                {props.children} 
            </div>
        </>
    )
}