class usuarios{
    constructor(){
        
    }

    // metodos assincrono para cadastrar usuarios, recebidos da interface usuarios
    async cadastrar_usuario(nome,email,senha,permissao){
        //fazemos requisição post no server.js passando os dados do usuario pelo body
        const response = await fetch('http://localhost:3000/inserir-usuarios',{
            method:'POST', //POST para enviar
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
 // metodos assincrono para atualizar usuarios, recebidos da interface usuarios
    async atualizar_usuario(id, nome, email, senha, permissao) {
    try {
         //fazemos requisição post no server.js passando os dados do usuario pelo body
        //id passado direto na requisição 
        const response = await fetch(`http://localhost:3000/atualizar-usuario/${id}`, {
            method: 'PUT', // PUT para atualizar 
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
// metodos assincrono para Obter usuarios
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

// Metodo assincrono para deletar usuarios
// id passado direto na requisição 
async deletar_usuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/deletar-usuario/${id}`, {
            method: 'DELETE', // delete para deletar usuarios
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