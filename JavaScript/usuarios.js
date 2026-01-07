class usuarios{
    constructor(){
        
    }

    async cadastrar_usuario(nome,email,senha,permissao){
        const response = await fetch('http://localhost:3000/inserir-usuarios',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:nome,
                email:email,
                password:senha,
                role: permissao
            })
        });

        if(!response.ok){
            throw new Error('Erro ao criar usuario');
        }

        const data = await response.json();
        console.log('Usuario criado',data)
    }

    async atualizar_usuario(id, nome, email, senha, permissao) {
    try {
        const response = await fetch(`http://localhost:3000/atualizar-usuario/${id}`, {
            method: 'PUT', // Ou 'PATCH' dependendo da sua API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                email: email,
                password: senha,
                role: permissao
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }

        const data = await response.json();
        console.log('Usuário atualizado com sucesso:', data);
        return data;
    } catch (error) {
        console.error("Erro na requisição PUT:", error);
        throw error;
    }
}

    async listar_usuarios() {
    try {
        const response = await fetch('http://localhost:3000/listar_usuarios');

        if (!response.ok) {
            throw new Error('Erro ao buscar lista de usuários');
        }

        const data = await response.json();
        console.log('Lista de usuários recebida:', data);
        return data; // Retorne os dados para que a interface possa usar
    } catch (error) {
        console.error(error.message);
    }
}
async deletar_usuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/deletar-usuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Tenta ler a mensagem de erro do servidor, se houver
            const erroData = await response.json();
            throw new Error(erroData.message || 'Erro ao deletar usuário');
        }

        const data = await response.json();
        console.log('Usuário removido:', data);
        return data;
    } catch (error) {
        console.error("Erro na requisição DELETE:", error.message);
        throw error;
    }
}

}