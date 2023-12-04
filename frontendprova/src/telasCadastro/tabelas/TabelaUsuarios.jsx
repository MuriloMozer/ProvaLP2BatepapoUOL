import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios } from "../../redux/usuarioReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function TabelaUsuarios(props) {
    const { estado, mensagem, usuarios } = useSelector(state => state.usuario);
    const dispatch = useDispatch();


    function editarUsuario(usuario) {
        // Lógica para editar usuário
    }

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Buscando usuários....</p>
            </div>
        ,{toastId:estado});
    }
    else if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>
            </div>
        , {toastId: estado});
    }
    else {
        toast.dismiss();
        return (
            <Container>
                <Button type="button" onClick={() => {
                    // Lógica para adicionar novo usuário
                }}>Novo Usuário</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario) => {
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>
                                            <Button onClick={() => {
                                                editarUsuario(usuario);
                                            }} variant="warning">
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
