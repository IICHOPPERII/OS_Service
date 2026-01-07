class Interface_usuarios{
    constructor(){
        
        this.usuario = new usuarios(); // recebe a class usuarios
        this.editar = false; // variavel para permitir editar
        this.id_usuario = null; // recebe id do usuario a ser editado

        this.iniciar_botoes(); // inicia a inteface de botoes cliques
        this.listar_usuarios(); // metodo para listar os usuarios
        
    }

    iniciar_botoes(){
        let novo_usuario = document.getElementById("novo_usuario");
        let fechar_form = document.getElementById("fechar_form");

        // botão de novo usuario
        novo_usuario.addEventListener('click',e=>{
            let form = document.querySelector(".formulario");
            form.style.display = 'block';
            this.editar = false;
        });

        // fechar formulario de cadastro
        fechar_form.addEventListener('click',e=>{
            let form = document.querySelector(".formulario");
            form.style.display = 'none';
        });

        //botão de cadastrar usuario
        let cadastrar_usuario = document.getElementById("enviar");
        cadastrar_usuario.addEventListener('click', async e => {
            e.preventDefault();

            // variaveis do usuario
            let name = document.querySelector(".nome").value;
            let email = document.querySelector(".email").value;
            let senha = document.querySelector(".senha").value;
            let permissao = document.querySelector(".permissao").value;

            let form = document.querySelector(".formulario");

            // se editar for verdadeiro vai atualizar os dados do usuario se não insere novo usuario
            if(this.editar == true){
                await this.usuario.atualizar_usuario(this.id_usuario,name,email,senha,permissao);
                this.editar = false;
                this.id_usuario = null;
            }else{
                console.log(name,email,senha,permissao);
                await this.usuario.cadastrar_usuario(name,email,senha,permissao);
            }
            // apos inserir ou atualizar lista os usuarios novamente
            await this.listar_usuarios();
            // remove o formulario de cadastro/atualização da tela 
            form.style.display = 'none';
        })
    }

    async listar_usuarios() {
    this.usuario.listar_usuarios().then(dados => {
        // Pegamos a lista de usuários que vem do seu backend
        let lista = dados.data; 
        
        // Selecionamos o corpo da tabela
        let tabela = document.querySelector("#corpo_tabela");
        
        // Limpamos a tabela antes de preencher (para não duplicar dados)
        tabela.innerHTML = "";

        // O loop deve envolver a criação das linhas
        lista.forEach(element => {
            console.log("Processando usuário:", element);

            // Criamos a linha "tr" para CADA elemento da lista
            let tr = document.createElement("tr"); 

            // Preenchemos o HTML da linha com os dados do 'element' atual
            tr.innerHTML = `
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>********</td>
                <td>${element.role}</td>
                <td class="acoes">

                    <button class="btn-editar"><i class="bi bi-gear-fill"></i></button>
                    <button class="btn-excluir"><i class="bi bi-x-octagon"></i></button>

                </td>
            `;

            const btnEditar = tr.querySelector(".btn-editar");
            const btnExcluir = tr.querySelector(".btn-excluir");

            // Adicionamos o evento ao botão Editar
            btnEditar.addEventListener("click", () => {
                
                this.editar = true; // editar recebe verdadeiro
                this.id_usuario = element.id; // recebe o id do usuario

                // torna o formulario visivel
                let form = document.querySelector(".formulario");
                form.style.display = 'block';

                // insere dados do usuario no formulario
                document.querySelector(".nome").value = element.name;
                document.querySelector(".email").value = element.email;
                document.querySelector(".senha").value = element.password;
                document.querySelector(".permissao").value = element.role;

            });

            // 3. Adicionamos o evento ao botão Excluir
             btnExcluir.addEventListener("click", () => {
                // fazemos um alert para confirmar se deseja excluir usuario
                if(confirm(`Tem certeza que deseja excluir ${element.name}?`)) {
                    // apos confirmar chama metodo para delete passando id do usuario
                    this.usuario.deletar_usuario(element.id).then(() => this.listar_usuarios());
                }
            });
            // Adicionamos a linha na tabela
            tabela.appendChild(tr);

        });
    }).catch(err => {
        console.error("Erro ao renderizar tabela:", err);
    });
}
}


var interface_user = new Interface_usuarios();