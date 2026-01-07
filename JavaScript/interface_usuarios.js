class Interface_usuarios{
    constructor(){
        
        this.usuario = new usuarios();
        this.editar = false;
        this.id_usuario = null;

        this.iniciar_botoes();
        this.listar_usuarios();
        
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

            let name = document.querySelector(".nome").value;
            let email = document.querySelector(".email").value;
            let senha = document.querySelector(".senha").value;
            let permissao = document.querySelector(".permissao").value;

            let form = document.querySelector(".formulario");

            if(this.editar == true){
                await this.usuario.atualizar_usuario(this.id_usuario,name,email,senha,permissao);
                this.editar = false;
                this.id_usuario = null;
            }else{
                console.log(name,email,senha,permissao);
                await this.usuario.cadastrar_usuario(name,email,senha,permissao);
            }
            await this.listar_usuarios();
            form.style.display = 'none';
        })
    }

    async listar_usuarios() {
    this.usuario.listar_usuarios().then(dados => {
        // 1. Pegamos a lista de usuários que vem do seu backend
        let lista = dados.data; 
        
        // 2. Selecionamos o corpo da tabela
        let tabela = document.querySelector("#corpo_tabela");
        
        // 3. Limpamos a tabela antes de preencher (para não duplicar dados)
        tabela.innerHTML = "";

        // 4. O loop deve envolver a criação das linhas
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

            // 2. Adicionamos o evento ao botão Editar
            btnEditar.addEventListener("click", () => {
                console.log("Editando o usuário:", element.name);
                this.editar = true;
                this.id_usuario = element.id;
                let form = document.querySelector(".formulario");
                form.style.display = 'block';

                document.querySelector(".nome").value = element.name;
                document.querySelector(".email").value = element.email;
                document.querySelector(".senha").value = element.password;
                document.querySelector(".permissao").value = element.role;

            });

            // 3. Adicionamos o evento ao botão Excluir
             btnExcluir.addEventListener("click", () => {
                if(confirm(`Tem certeza que deseja excluir ${element.name}?`)) {
                    console.log("Excluindo ID:", element.id);
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