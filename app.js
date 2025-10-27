// Estado da aplicação (armazenamento local)
let turmas = [];
let professores = [];
let disciplinas = [];
let salas = [];
let aulas = [];

// Chave para localStorage
const STORAGE_KEY = 'sistema_aulas_dados';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForms();
    loadAllData();
    setCurrentMonthYear();
    initKeyboardEvents();
});

// Inicializar eventos de teclado
function initKeyboardEvents() {
    // Eventos para os campos de cadastro
    const inputs = ['input-turma', 'input-professor', 'input-disciplina', 'input-sala'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && input.dataset.editingId) {
                    e.preventDefault();
                    salvarEdicaoItem(input);
                } else if (e.key === 'Escape' && input.dataset.editingId) {
                    e.preventDefault();
                    cancelarEdicaoItem(input);
                }
            });
        }
    });
}

// Sistema de Tabs
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            if (tabName === 'aulas') {
                updateAulaSelects();
            }
        });
    });
}

// Inicializar formulários
function initForms() {
    // Formulário de Cadastro Completo
    document.getElementById('form-cadastro-completo').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const turma = document.getElementById('input-turma').value.trim();
        const professor = document.getElementById('input-professor').value.trim();
        const disciplina = document.getElementById('input-disciplina').value.trim();
        const sala = document.getElementById('input-sala').value.trim();
        
        // Verificar se está editando algum item
        const turmaInput = document.getElementById('input-turma');
        const professorInput = document.getElementById('input-professor');
        const disciplinaInput = document.getElementById('input-disciplina');
        const salaInput = document.getElementById('input-sala');
        
        let editandoAlgum = false;
        
        // Verificar e salvar edições
        if (turmaInput.dataset.editingId) {
            salvarEdicaoItem(turmaInput);
            editandoAlgum = true;
        }
        if (professorInput.dataset.editingId) {
            salvarEdicaoItem(professorInput);
            editandoAlgum = true;
        }
        if (disciplinaInput.dataset.editingId) {
            salvarEdicaoItem(disciplinaInput);
            editandoAlgum = true;
        }
        if (salaInput.dataset.editingId) {
            salvarEdicaoItem(salaInput);
            editandoAlgum = true;
        }
        
        if (editandoAlgum) {
            // Limpar formulário após edição
            document.getElementById('form-cadastro-completo').reset();
            return;
        }
        
        // Se não está editando, adicionar novos itens
        if (turma && professor && disciplina && sala) {
            showToast('Adicionando dados...', 'info');
            
            addItem('turmas', { nome: turma }, true);
            addItem('professores', { nome: professor }, true);
            addItem('disciplinas', { nome: disciplina }, true);
            addItem('salas', { nome: sala }, true);
            
            // Limpar formulário
            document.getElementById('form-cadastro-completo').reset();
            
            showToast('✅ Todos os dados foram adicionados com sucesso!', 'success');
        } else {
            showToast('⚠️ Preencha todos os campos!', 'error');
        }
    });

    // Formulário de Aula
    document.getElementById('form-aula').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
        const semanas = Array.from(checkboxes).map(cb => cb.value);
        
        if (semanas.length === 0) {
            showToast('Selecione pelo menos uma semana!', 'error');
            return;
        }
        
        const totalHorasMes = parseFloat(document.getElementById('aula-horas-mes').value);
        
        // Verificar se está editando uma aula existente
        const editingId = document.getElementById('form-aula').dataset.editingId;
        
        if (editingId) {
            // EDITAR aula existente
            const aulaIndex = aulas.findIndex(a => a.id === editingId);
            if (aulaIndex !== -1) {
                aulas[aulaIndex] = {
                    ...aulas[aulaIndex],
                    turmaId: document.getElementById('aula-turma').value,
                    professorId: document.getElementById('aula-professor').value,
                    disciplinaId: document.getElementById('aula-disciplina').value,
                    salaId: document.getElementById('aula-sala').value,
                    diaSemana: document.getElementById('aula-dia').value,
                    horarioInicio: document.getElementById('aula-inicio').value,
                    horarioFim: document.getElementById('aula-fim').value,
                    totalHorasMes: totalHorasMes,
                    semanas: semanas,
                    dataAtualizacao: new Date().toISOString()
                };
                
                renderAulas();
                saveAllData();
                
                showToast('✅ Aula editada com sucesso!', 'success');
                
                // Limpar formulário e sair do modo de edição
                document.getElementById('form-aula').reset();
                document.getElementById('form-aula').removeAttribute('data-editing-id');
                
                // Restaurar o botão
                const submitBtn = document.querySelector('#form-aula button[type="submit"]');
                submitBtn.textContent = 'Cadastrar Aula';
                submitBtn.style.backgroundColor = '';
                
                // Marcar todas as semanas novamente
                document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
                    cb.checked = true;
                });
            }
        } else {
            // CADASTRAR nova aula
            const novaAula = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                turmaId: document.getElementById('aula-turma').value,
                professorId: document.getElementById('aula-professor').value,
                disciplinaId: document.getElementById('aula-disciplina').value,
                salaId: document.getElementById('aula-sala').value,
                diaSemana: document.getElementById('aula-dia').value,
                horarioInicio: document.getElementById('aula-inicio').value,
                horarioFim: document.getElementById('aula-fim').value,
                totalHorasMes: totalHorasMes,
                semanas: semanas,
                dataCriacao: new Date().toISOString()
            };
            
            aulas.push(novaAula);
            renderAulas();
            saveAllData();
            
            showToast('✅ Aula cadastrada com sucesso!', 'success');
            document.getElementById('form-aula').reset();
            
            // Marcar todas as semanas novamente
            document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
                cb.checked = true;
            });
        }
    });

    // Formulário de Relatório
    document.getElementById('form-relatorio').addEventListener('submit', (e) => {
        e.preventDefault();
        const mes = document.getElementById('relatorio-mes').value;
        const ano = document.getElementById('relatorio-ano').value;
        gerarRelatorioPDF(mes, ano);
    });
}

// Carregar dados do localStorage
function loadAllData() {
    try {
        // Tentar carregar do localStorage primeiro
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const data = JSON.parse(savedData);
            turmas = data.turmas || [];
            professores = data.professores || [];
            disciplinas = data.disciplinas || [];
            salas = data.salas || [];
            aulas = data.aulas || [];
            
            renderList('lista-turmas', turmas, 'turmas');
            renderList('lista-professores', professores, 'professores');
            renderList('lista-disciplinas', disciplinas, 'disciplinas');
            renderList('lista-salas', salas, 'salas');
            renderAulas();
            updateAulaSelects();
            saveToJsonFile();
            
            showToast('✅ Dados carregados do navegador!', 'success');
        } else {
            // Inicializar com dados vazios
            turmas = [];
            professores = [];
            disciplinas = [];
            salas = [];
            aulas = [];
            
            renderList('lista-turmas', turmas, 'turmas');
            renderList('lista-professores', professores, 'professores');
            renderList('lista-disciplinas', disciplinas, 'disciplinas');
            renderList('lista-salas', salas, 'salas');
            renderAulas();
            updateAulaSelects();
            saveToJsonFile();
            
            showToast('🎉 Sistema iniciado! Comece cadastrando seus dados.', 'info');
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showToast('⚠️ Erro ao carregar dados. Iniciando sistema limpo...', 'error');
        
        // Inicializar com dados vazios em caso de erro
        turmas = [];
        professores = [];
        disciplinas = [];
        salas = [];
        aulas = [];
        
        renderList('lista-turmas', turmas, 'turmas');
        renderList('lista-professores', professores, 'professores');
        renderList('lista-disciplinas', disciplinas, 'disciplinas');
        renderList('lista-salas', salas, 'salas');
        renderAulas();
        updateAulaSelects();
        saveToJsonFile();
    }
}

// Salvar dados no localStorage
function saveAllData() {
    const data = {
        turmas,
        professores,
        disciplinas,
        salas,
        aulas,
        ultimaAtualizacao: new Date().toISOString()
    };
    
    try {
        // Salvar no localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('✅ Dados salvos no navegador!');
    
    // Atualizar link de download
    saveToJsonFile();
        
        showToast('💾 Dados salvos automaticamente!', 'success');
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        showToast('⚠️ Erro ao salvar dados!', 'error');
    }
}

// Adicionar item
function addItem(tipo, data, silent = false) {
    const novoItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        nome: data.nome,
        dataCriacao: new Date().toISOString()
    };
    
    switch(tipo) {
        case 'turmas':
            turmas.push(novoItem);
            renderList('lista-turmas', turmas, tipo);
            break;
        case 'professores':
            professores.push(novoItem);
            renderList('lista-professores', professores, tipo);
            break;
        case 'disciplinas':
            disciplinas.push(novoItem);
            renderList('lista-disciplinas', disciplinas, tipo);
            break;
        case 'salas':
            salas.push(novoItem);
            renderList('lista-salas', salas, tipo);
            break;
    }
    
    saveAllData();
    
    if (!silent) {
        showToast('Item adicionado com sucesso!', 'success');
    }
}

// Deletar item
function deleteItem(tipo, id) {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    
    switch(tipo) {
        case 'turmas':
            turmas = turmas.filter(t => t.id !== id);
            renderList('lista-turmas', turmas, tipo);
            break;
        case 'professores':
            professores = professores.filter(p => p.id !== id);
            renderList('lista-professores', professores, tipo);
            break;
        case 'disciplinas':
            disciplinas = disciplinas.filter(d => d.id !== id);
            renderList('lista-disciplinas', disciplinas, tipo);
            break;
        case 'salas':
            salas = salas.filter(s => s.id !== id);
            renderList('lista-salas', salas, tipo);
            break;
        case 'aulas':
            aulas = aulas.filter(a => a.id !== id);
            renderAulas();
            break;
    }
    
    saveAllData();
    showToast('Item excluído com sucesso!', 'success');
}

// Renderizar lista
function renderList(elementId, items, tipo) {
    const lista = document.getElementById(elementId);
    
    if (items.length === 0) {
        lista.innerHTML = '<li class="empty">Nenhum item cadastrado</li>';
        return;
    }
    
    lista.innerHTML = items.map(item => `
        <li>
            <span>${item.nome}</span>
            <div style="display: flex; gap: 5px;">
                <button class="btn-edit" onclick="editarItem('${tipo}', '${item.id}')" title="Editar ${tipo.slice(0, -1)}">✏️</button>
                <button class="btn-delete" onclick="deleteItem('${tipo}', '${item.id}')">🗑️</button>
            </div>
        </li>
    `).join('');
}

// Atualizar selects de aula
function updateAulaSelects() {
    const selectTurma = document.getElementById('aula-turma');
    const selectProfessor = document.getElementById('aula-professor');
    const selectDisciplina = document.getElementById('aula-disciplina');
    const selectSala = document.getElementById('aula-sala');
    
    selectTurma.innerHTML = '<option value="">Selecione uma turma</option>' +
        turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    
    selectProfessor.innerHTML = '<option value="">Selecione um professor</option>' +
        professores.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
    
    selectDisciplina.innerHTML = '<option value="">Selecione uma disciplina</option>' +
        disciplinas.map(d => `<option value="${d.id}">${d.nome}</option>`).join('');
    
    selectSala.innerHTML = '<option value="">Selecione uma sala</option>' +
        salas.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
}

// Renderizar aulas
function renderAulas() {
    const container = document.getElementById('lista-aulas-cadastradas');
    
    if (aulas.length === 0) {
        container.innerHTML = '<p class="empty">Nenhuma aula cadastrada</p>';
        return;
    }
    
    container.innerHTML = aulas.map(aula => {
        const turma = turmas.find(t => t.id === aula.turmaId);
        const professor = professores.find(p => p.id === aula.professorId);
        const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
        const sala = salas.find(s => s.id === aula.salaId);
        
        return `
            <div class="aula-card">
                <div class="aula-header">
                    <h3>${disciplina?.nome || 'N/A'}</h3>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn-whatsapp" onclick="enviarWhatsApp('${aula.id}')" title="Enviar para WhatsApp">📱</button>
                        <button class="btn-edit" onclick="editarAula('${aula.id}')" title="Editar esta aula">✏️</button>
                        <button class="btn-download" onclick="baixarRelatorioAula('${aula.id}')" title="Baixar relatório desta aula">📥</button>
                        <button class="btn-delete" onclick="deleteItem('aulas', '${aula.id}')">🗑️</button>
                    </div>
                </div>
                <div class="aula-info">
                    <p><strong>Turma:</strong> ${turma?.nome || 'N/A'}</p>
                    <p><strong>Professor:</strong> ${professor?.nome || 'N/A'}</p>
                    <p><strong>Sala:</strong> ${sala?.nome || 'N/A'}</p>
                    <p><strong>Dia:</strong> ${aula.diaSemana}</p>
                    <p><strong>Horário:</strong> ${aula.horarioInicio} - ${aula.horarioFim}</p>
                    <p><strong>Semanas:</strong> ${aula.semanas.join(', ')}</p>
                    <p><strong>⏱️ Total de Horas do Mês:</strong> ${aula.totalHorasMes || 0}h</p>
                </div>
            </div>
        `;
    }).join('');
}

// Salvar dados em arquivo JSON para download
function saveToJsonFile() {
    const data = {
        turmas,
        professores,
        disciplinas,
        salas,
        aulas,
        ultimaAtualizacao: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Criar link invisível para download
    let downloadLink = document.getElementById('json-download-link');
    if (!downloadLink) {
        downloadLink = document.createElement('a');
        downloadLink.id = 'json-download-link';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }
    
    downloadLink.href = url;
    downloadLink.download = 'dados.json';
}

// Baixar arquivo JSON manualmente
async function downloadJsonFile() {
    try {
        const pastaDestino = 'C:\\Users\\Ild\\Desktop\\Sistema de Controle de aulas\\BANCO DE DADOS';
        
        // Tentar usar File System Access API para salvar na pasta específica
        if ('showSaveFilePicker' in window) {
            const dataAtual = new Date().toISOString().split('T')[0];
            const fileName = `dados_${dataAtual}.json`;
            
            const options = {
                suggestedName: fileName,
                types: [{
                    description: 'Arquivos JSON',
                    accept: {
                        'application/json': ['.json']
                    }
                }]
            };
            
            const fileHandle = await window.showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            
            // Obter dados atuais
            const data = {
                turmas,
                professores,
                disciplinas,
                salas,
                aulas,
                ultimaAtualizacao: new Date().toISOString()
            };
            
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            
            await writable.write(blob);
            await writable.close();
            
            showToast(`📥 Arquivo salvo com sucesso!\n📁 Salve em: ${pastaDestino}`, 'success');
        } else {
            // Fallback para download normal
            const link = document.getElementById('json-download-link');
            if (link) {
                link.click();
                showToast(`📥 Arquivo dados.json baixado!\n📁 Salve em: ${pastaDestino}`, 'success');
            }
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('❌ Salvamento cancelado pelo usuário', 'info');
        } else {
            console.error('Erro ao salvar arquivo:', error);
            // Fallback para download normal
    const link = document.getElementById('json-download-link');
    if (link) {
        link.click();
        showToast('📥 Arquivo dados.json baixado!', 'success');
            }
        }
    }
}

// Abrir seletor de arquivo para importação
function importJsonFile() {
    const fileInput = document.getElementById('json-file-input');
    
    // Configurar o diretório inicial se possível
    try {
        // Tentar usar File System Access API para abrir na pasta específica
        if ('showOpenFilePicker' in window) {
            openFileFromSpecificDirectory();
        } else {
            // Fallback para input file normal
            fileInput.click();
        }
    } catch (error) {
        console.log('Usando fallback para input file');
        fileInput.click();
    }
}

// Função para abrir arquivo da pasta específica
async function openFileFromSpecificDirectory() {
    try {
        const pastaDestino = 'C:\\Users\\Ild\\Desktop\\Sistema de Controle de aulas\\BANCO DE DADOS';
        
        const options = {
            types: [{
                description: 'Arquivos JSON',
                accept: {
                    'application/json': ['.json']
                }
            }],
            excludeAcceptAllOption: false,
            multiple: false
        };
        
        const [fileHandle] = await window.showOpenFilePicker(options);
        const file = await fileHandle.getFile();
        
        // Processar o arquivo
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                importJsonData(jsonData);
            } catch (error) {
                showToast('⚠️ Erro ao ler arquivo JSON. Verifique se o arquivo está no formato correto!', 'error');
                console.error('Erro ao parsear JSON:', error);
            }
        };
        
        reader.onerror = function() {
            showToast('⚠️ Erro ao ler o arquivo!', 'error');
        };
        
        reader.readAsText(file);
        
        showToast(`📁 Abrindo arquivo da pasta: ${pastaDestino}`, 'info');
        
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('❌ Seleção de arquivo cancelada', 'info');
        } else {
            console.error('Erro ao abrir arquivo:', error);
            // Fallback para input file normal
            const fileInput = document.getElementById('json-file-input');
            fileInput.click();
        }
    }
}

// Processar arquivo JSON importado
function handleJsonFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.json')) {
        showToast('⚠️ Por favor, selecione um arquivo JSON válido!', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            importJsonData(jsonData);
        } catch (error) {
            showToast('⚠️ Erro ao ler arquivo JSON. Verifique se o arquivo está no formato correto!', 'error');
            console.error('Erro ao parsear JSON:', error);
        }
    };
    
    reader.onerror = function() {
        showToast('⚠️ Erro ao ler o arquivo!', 'error');
    };
    
    reader.readAsText(file);
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    event.target.value = '';
}

// Importar dados JSON
function importJsonData(jsonData) {
    try {
        // Validar se é um objeto válido
        if (!jsonData || typeof jsonData !== 'object') {
            showToast('⚠️ Arquivo JSON inválido!', 'error');
            return;
        }
        
        // Verificar se tem pelo menos uma propriedade esperada
        const expectedProperties = ['turmas', 'professores', 'disciplinas', 'salas', 'aulas'];
        const hasAnyProperty = expectedProperties.some(prop => 
            jsonData.hasOwnProperty(prop) && Array.isArray(jsonData[prop])
        );
        
        if (!hasAnyProperty) {
            showToast('⚠️ Arquivo JSON não contém dados válidos do sistema!', 'error');
            return;
        }
        
        // Confirmar importação
        const confirmMessage = `Deseja importar os dados do arquivo JSON?\n\n` +
            `📊 Dados encontrados:\n` +
            `• Turmas: ${jsonData.turmas?.length || 0}\n` +
            `• Professores: ${jsonData.professores?.length || 0}\n` +
            `• Disciplinas: ${jsonData.disciplinas?.length || 0}\n` +
            `• Salas: ${jsonData.salas?.length || 0}\n` +
            `• Aulas: ${jsonData.aulas?.length || 0}\n\n` +
            `⚠️ ATENÇÃO: Esta ação irá substituir todos os dados atuais!`;
        
        if (!confirm(confirmMessage)) {
            showToast('❌ Importação cancelada pelo usuário', 'info');
            return;
        }
        
        // Importar dados (usar arrays vazios se não existirem)
        turmas = Array.isArray(jsonData.turmas) ? jsonData.turmas : [];
        professores = Array.isArray(jsonData.professores) ? jsonData.professores : [];
        disciplinas = Array.isArray(jsonData.disciplinas) ? jsonData.disciplinas : [];
        salas = Array.isArray(jsonData.salas) ? jsonData.salas : [];
        aulas = Array.isArray(jsonData.aulas) ? jsonData.aulas : [];
        
        // Atualizar interface
        renderList('lista-turmas', turmas, 'turmas');
        renderList('lista-professores', professores, 'professores');
        renderList('lista-disciplinas', disciplinas, 'disciplinas');
        renderList('lista-salas', salas, 'salas');
        renderAulas();
        updateAulaSelects();
        
        // Salvar dados
        saveAllData();
        
        showToast('✅ Dados importados com sucesso!', 'success');
        
    } catch (error) {
        showToast('⚠️ Erro ao importar dados: ' + error.message, 'error');
        console.error('Erro na importação:', error);
    }
}

// Validar estrutura do JSON
function validateJsonStructure(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    
    // Verificar se tem pelo menos uma das propriedades esperadas
    const expectedProperties = ['turmas', 'professores', 'disciplinas', 'salas', 'aulas'];
    const hasValidProperties = expectedProperties.some(prop => 
        data.hasOwnProperty(prop) && Array.isArray(data[prop])
    );
    
    if (!hasValidProperties) {
        return false;
    }
    
    // Validar estrutura dos itens (se existirem e não estiverem vazios)
    for (const prop of expectedProperties) {
        if (data[prop] && Array.isArray(data[prop]) && data[prop].length > 0) {
            for (const item of data[prop]) {
                if (!item || typeof item !== 'object' || !item.id || !item.nome) {
                    return false;
                }
            }
        }
    }
    
    return true;
}

// Função auxiliar para aplicar estilo em tabelas - Versão melhorada para compatibilidade
function aplicarEstiloTabela(ws) {
    if (!ws['!ref']) return;
    
    const range = XLSX.utils.decode_range(ws['!ref']);
    
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            
            // Garantir que a célula existe
            if (!ws[cellAddress]) {
                ws[cellAddress] = { v: '', t: 's' };
            }
            
            // Estilo do cabeçalho (primeira linha)
            if (R === 0) {
                ws[cellAddress].s = {
                    fill: { 
                        fgColor: { rgb: "9E9E9E" },
                        patternType: "solid"
                    },
                    font: { 
                        bold: true, 
                        color: { rgb: "FFFFFF" }, 
                        sz: 12,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "center", 
                        vertical: "center",
                        wrapText: true
                    },
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    }
                };
            } else {
                // Linhas alternadas (zebrado)
                const corFundo = R % 2 === 0 ? "FFFFFF" : "F5F5F5";
                
                ws[cellAddress].s = {
                    fill: { 
                        fgColor: { rgb: corFundo },
                        patternType: "solid"
                    },
                    font: { 
                        color: { rgb: "000000" }, 
                        sz: 11,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "left", 
                        vertical: "center",
                        wrapText: true
                    },
                    border: {
                        top: { style: "thin", color: { rgb: "E0E0E0" } },
                        bottom: { style: "thin", color: { rgb: "E0E0E0" } },
                        left: { style: "thin", color: { rgb: "E0E0E0" } },
                        right: { style: "thin", color: { rgb: "E0E0E0" } }
                    }
                };
            }
        }
    }
}

// Gerar relatório Excel
async function gerarRelatorioPDF(mes, ano) {
    showToast('Gerando relatório Excel...', 'info');
    
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesNome = mesesNomes[parseInt(mes) - 1];
    
    // Criar workbook
    const wb = XLSX.utils.book_new();
    
    // ABA 1: RESUMO
    const resumoData = [
        ['RELATÓRIO COMPLETO DE AULAS'],
        [`Referência: ${mesNome}/${ano}`],
        [`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`],
        [],
        ['RESUMO GERAL - TODAS AS AULAS DO SISTEMA'],
        ['Total de Turmas', turmas.length],
        ['Total de Professores', professores.length],
        ['Total de Disciplinas', disciplinas.length],
        ['Total de Salas', salas.length],
        ['Total de Aulas Cadastradas', aulas.length],
        [],
        ['OBSERVAÇÃO: Este relatório contém TODAS as aulas cadastradas no sistema']
    ];
    const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');
    
    // ABA 2: ESCALA COMPLETA DE TODAS AS AULAS
    if (aulas.length === 0) {
        const wsAulas = XLSX.utils.aoa_to_sheet([
            ['Nenhuma aula cadastrada no sistema']
        ]);
        XLSX.utils.book_append_sheet(wb, wsAulas, 'Todas as Aulas');
    } else {
        const aulasData = [
            ['#', 'Turma', 'Professor', 'Disciplina', 'Sala', 'Dia da Semana', 'Horário Início', 'Horário Fim', 'Total Horas/Mês', 'Semanas', 'Data Cadastro']
        ];
        
        aulas.forEach((aula, index) => {
            const turma = turmas.find(t => t.id === aula.turmaId);
            const professor = professores.find(p => p.id === aula.professorId);
            const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
            const sala = salas.find(s => s.id === aula.salaId);
            
            aulasData.push([
                index + 1,
                turma?.nome || 'N/A',
                professor?.nome || 'N/A',
                disciplina?.nome || 'N/A',
                sala?.nome || 'N/A',
                aula.diaSemana,
                aula.horarioInicio,
                aula.horarioFim,
                aula.totalHorasMes || 0,
                aula.semanas.join(', '),
                new Date(aula.dataCriacao).toLocaleDateString('pt-BR')
            ]);
        });
        
        const wsAulas = XLSX.utils.aoa_to_sheet(aulasData);
        
        // Ajustar largura das colunas
        wsAulas['!cols'] = [
            { wch: 5 },  // #
            { wch: 15 }, // Turma
            { wch: 20 }, // Professor
            { wch: 20 }, // Disciplina
            { wch: 10 }, // Sala
            { wch: 15 }, // Dia
            { wch: 12 }, // Início
            { wch: 12 }, // Fim
            { wch: 16 }, // Total Horas/Mês
            { wch: 20 }, // Semanas
            { wch: 15 }  // Data Cadastro
        ];
        
        // Aplicar cores e estilos - Versão melhorada para compatibilidade
        const range = XLSX.utils.decode_range(wsAulas['!ref']);
        
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                
                // Garantir que a célula existe
                if (!wsAulas[cellAddress]) {
                    wsAulas[cellAddress] = { v: '', t: 's' };
                }
                
                // Estilo do cabeçalho (primeira linha)
                if (R === 0) {
                    wsAulas[cellAddress].s = {
                        fill: { 
                            fgColor: { rgb: "9E9E9E" },
                            patternType: "solid"
                        },
                        font: { 
                            bold: true, 
                            color: { rgb: "FFFFFF" }, 
                            sz: 12,
                            name: "Arial"
                        },
                        alignment: { 
                            horizontal: "center", 
                            vertical: "center",
                            wrapText: true
                        },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } }
                        }
                    };
                } else {
                    // Linhas alternadas (zebrado)
                    const corFundo = R % 2 === 0 ? "FFFFFF" : "F5F5F5";
                    
                    wsAulas[cellAddress].s = {
                        fill: { 
                            fgColor: { rgb: corFundo },
                            patternType: "solid"
                        },
                        font: { 
                            color: { rgb: "000000" }, 
                            sz: 11,
                            name: "Arial"
                        },
                        alignment: { 
                            horizontal: "left", 
                            vertical: "center",
                            wrapText: true
                        },
                        border: {
                            top: { style: "thin", color: { rgb: "E0E0E0" } },
                            bottom: { style: "thin", color: { rgb: "E0E0E0" } },
                            left: { style: "thin", color: { rgb: "E0E0E0" } },
                            right: { style: "thin", color: { rgb: "E0E0E0" } }
                        }
                    };
                    
                    // Centralizar coluna # e Total Horas/Mês
                    if (C === 0 || C === 8) {
                        wsAulas[cellAddress].s.alignment = { 
                            horizontal: "center", 
                            vertical: "center",
                            wrapText: true
                        };
                    }
                }
            }
        }
        
        XLSX.utils.book_append_sheet(wb, wsAulas, 'Todas as Aulas');
    }
    
    // ABA 3: TURMAS
    const turmasData = [['ID', 'Nome', 'Data de Criação']];
    turmas.forEach(t => {
        turmasData.push([t.id, t.nome, new Date(t.dataCriacao).toLocaleDateString('pt-BR')]);
    });
    const wsTurmas = XLSX.utils.aoa_to_sheet(turmasData);
    aplicarEstiloTabela(wsTurmas);
    XLSX.utils.book_append_sheet(wb, wsTurmas, 'Turmas');
    
    // ABA 4: PROFESSORES
    const professoresData = [['ID', 'Nome', 'Data de Criação']];
    professores.forEach(p => {
        professoresData.push([p.id, p.nome, new Date(p.dataCriacao).toLocaleDateString('pt-BR')]);
    });
    const wsProfessores = XLSX.utils.aoa_to_sheet(professoresData);
    aplicarEstiloTabela(wsProfessores);
    XLSX.utils.book_append_sheet(wb, wsProfessores, 'Professores');
    
    // ABA 5: DISCIPLINAS
    const disciplinasData = [['ID', 'Nome', 'Data de Criação']];
    disciplinas.forEach(d => {
        disciplinasData.push([d.id, d.nome, new Date(d.dataCriacao).toLocaleDateString('pt-BR')]);
    });
    const wsDisciplinas = XLSX.utils.aoa_to_sheet(disciplinasData);
    aplicarEstiloTabela(wsDisciplinas);
    XLSX.utils.book_append_sheet(wb, wsDisciplinas, 'Disciplinas');
    
    // ABA 6: SALAS
    const salasData = [['ID', 'Nome', 'Data de Criação']];
    salas.forEach(s => {
        salasData.push([s.id, s.nome, new Date(s.dataCriacao).toLocaleDateString('pt-BR')]);
    });
    const wsSalas = XLSX.utils.aoa_to_sheet(salasData);
    aplicarEstiloTabela(wsSalas);
    XLSX.utils.book_append_sheet(wb, wsSalas, 'Salas');
    
    // ABA 7: BANCO DE HORAS POR PROFESSOR
    const bancoHorasData = [['Professor', 'Total de Aulas', 'Total Horas/Mês']];
    
    // Agrupar horas por professor
    const horasPorProfessor = {};
    aulas.forEach(aula => {
        const professor = professores.find(p => p.id === aula.professorId);
        const nomeProfessor = professor?.nome || 'N/A';
        
        if (!horasPorProfessor[nomeProfessor]) {
            horasPorProfessor[nomeProfessor] = {
                totalAulas: 0,
                totalHoras: 0
            };
        }
        
        horasPorProfessor[nomeProfessor].totalAulas += 1;
        horasPorProfessor[nomeProfessor].totalHoras += (aula.totalHorasMes || 0);
    });
    
    // Adicionar dados ao array
    Object.keys(horasPorProfessor).sort().forEach(professor => {
        bancoHorasData.push([
            professor,
            horasPorProfessor[professor].totalAulas,
            horasPorProfessor[professor].totalHoras
        ]);
    });
    
    // Adicionar linha de total
    const totalAulas = Object.values(horasPorProfessor).reduce((sum, p) => sum + p.totalAulas, 0);
    const totalHoras = Object.values(horasPorProfessor).reduce((sum, p) => sum + p.totalHoras, 0);
    bancoHorasData.push(['', '', '']);
    bancoHorasData.push(['TOTAL GERAL', totalAulas, totalHoras]);
    
    const wsBancoHoras = XLSX.utils.aoa_to_sheet(bancoHorasData);
    wsBancoHoras['!cols'] = [
        { wch: 30 }, // Professor
        { wch: 15 }, // Total Aulas
        { wch: 18 }  // Total Horas
    ];
    
    // Aplicar estilo na aba de Banco de Horas
    aplicarEstiloTabela(wsBancoHoras);
    
    // Destacar linha de total em negrito
    const ultimaLinha = bancoHorasData.length - 1;
    for (let C = 0; C <= 2; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: ultimaLinha, c: C });
        if (wsBancoHoras[cellAddress]) {
            wsBancoHoras[cellAddress].s = {
                fill: { fgColor: { rgb: "BDBDBD" } },
                font: { bold: true, color: { rgb: "000000" }, sz: 12 },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "medium", color: { rgb: "000000" } },
                    bottom: { style: "medium", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };
        }
    }
    
    XLSX.utils.book_append_sheet(wb, wsBancoHoras, 'Banco de Horas');
    
    // Salvar arquivo com seletor de pasta - Versão melhorada para compatibilidade
    try {
        const fileName = `relatorio_${mes}_${ano}.xlsx`;
        
        // Configurar opções de escrita para melhor compatibilidade
        const writeOptions = {
            bookType: 'xlsx',
            type: 'array',
            cellStyles: true,
            cellNF: false,
            cellHTML: false
        };
        
        // Tentar usar File System Access API para escolher pasta
        if ('showSaveFilePicker' in window) {
            const options = {
                suggestedName: fileName,
                startIn: 'desktop', // Começar na Área de Trabalho (Desktop)
                types: [{
                    description: 'Planilhas Excel',
                    accept: {
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                    }
                }]
            };
            
            const fileHandle = await window.showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            
            // Converter workbook para buffer com opções melhoradas
            const wbout = XLSX.write(wb, writeOptions);
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            await writable.write(blob);
            await writable.close();
            
            showToast('📊 Relatório salvo com sucesso!\n💡 Abra no Excel para ver as cores!', 'success');
        } else {
            // Fallback para navegadores que não suportam File System Access API
            XLSX.writeFile(wb, fileName, writeOptions);
            showToast('📊 Relatório exportado!\n💡 Salve na Área de Trabalho (Desktop)\n💡 Abra no Excel para ver as cores!', 'success');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('❌ Salvamento cancelado pelo usuário', 'info');
        } else {
            console.error('Erro ao salvar arquivo:', error);
            // Fallback para download normal
            XLSX.writeFile(wb, `relatorio_${mes}_${ano}.xlsx`, { bookType: 'xlsx', cellStyles: true });
            showToast('📊 Relatório exportado!\n💡 Salve na Área de Trabalho (Desktop)\n💡 Abra no Excel para ver as cores!', 'success');
        }
    }
}

// Calcular os dias específicos que serão trabalhados
function calcularDiasTrabalhados(aula) {
    const diasDaSemana = {
        'Segunda-feira': 1,
        'Terça-feira': 2,
        'Quarta-feira': 3,
        'Quinta-feira': 4,
        'Sexta-feira': 5,
        'Sábado': 6,
        'Domingo': 0
    };
    
    const diaDaSemana = diasDaSemana[aula.diaSemana];
    const hoje = new Date();
    
    const diasTrabalhados = [];
    
    // Encontrar a próxima ocorrência do dia da semana
    let dataAtual = new Date(hoje);
    
    // Sempre encontrar o PRÓXIMO dia da semana (nunca começar de hoje)
    const diasParaAvancar = (diaDaSemana - dataAtual.getDay() + 7) % 7;
    // Se hoje é o dia da semana, avançar 7 dias para a próxima semana
    const diasFinais = diasParaAvancar === 0 ? 7 : diasParaAvancar;
    dataAtual.setDate(dataAtual.getDate() + diasFinais);
    
    // Encontrar as próximas 4 ocorrências do dia da semana
    let encontrosAdicionados = 0;
    while (encontrosAdicionados < 4) {
        if (dataAtual.getDay() === diaDaSemana) {
            const dataFormatada = dataAtual.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });
            diasTrabalhados.push(dataFormatada);
            encontrosAdicionados++;
        }
        dataAtual.setDate(dataAtual.getDate() + 7); // Próxima semana
    }
    
    return diasTrabalhados;
}

// Baixar relatório individual de uma aula
async function baixarRelatorioAula(aulaId) {
    const aula = aulas.find(a => a.id === aulaId);
    if (!aula) {
        showToast('⚠️ Aula não encontrada!', 'error');
        return;
    }
    
    const turma = turmas.find(t => t.id === aula.turmaId);
    const professor = professores.find(p => p.id === aula.professorId);
    const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
    const sala = salas.find(s => s.id === aula.salaId);
    
    // Criar workbook
    const wb = XLSX.utils.book_new();
    
    // Calcular os dias específicos que serão trabalhados
    const diasTrabalhados = calcularDiasTrabalhados(aula);
    
    // Dados da aula
    const aulaData = [
        ['RELATÓRIO INDIVIDUAL DE AULA'],
        [`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`],
        [],
        ['INFORMAÇÕES DA AULA'],
        [],
        ['Disciplina:', disciplina?.nome || 'N/A'],
        ['Turma:', turma?.nome || 'N/A'],
        ['Professor:', professor?.nome || 'N/A'],
        ['Sala:', sala?.nome || 'N/A'],
        [],
        ['HORÁRIO'],
        [],
        ['Dia da Semana:', aula.diaSemana],
        ['Horário Início:', aula.horarioInicio],
        ['Horário Fim:', aula.horarioFim],
        [],
        ['CARGA HORÁRIA'],
        [],
        ['Semanas do Mês:', aula.semanas.join(', ')],
        ['Total de Horas/Mês:', `${aula.totalHorasMes || 0}h`],
        [],
        ['DIAS QUE SERÃO TRABALHADOS'],
        []
    ];
    
    // Adicionar cada dia trabalhado
    diasTrabalhados.forEach((dia, index) => {
        aulaData.push([`${index + 1}ª Aula:`, dia]);
    });
    
    aulaData.push([]);
    aulaData.push(['DADOS ADICIONAIS']);
    aulaData.push([]);
    aulaData.push(['Data de Cadastro:', new Date(aula.dataCriacao).toLocaleDateString('pt-BR')]);
    aulaData.push(['ID da Aula:', aula.id]);
    
    const ws = XLSX.utils.aoa_to_sheet(aulaData);
    
    // Ajustar largura das colunas
    ws['!cols'] = [
        { wch: 25 },
        { wch: 30 }
    ];
    
    // Aplicar estilos - Versão melhorada para compatibilidade
    const range = XLSX.utils.decode_range(ws['!ref']);
    
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            
            // Garantir que a célula existe
            if (!ws[cellAddress]) {
                ws[cellAddress] = { v: '', t: 's' };
            }
            
            // Título principal (linha 0)
            if (R === 0) {
                ws[cellAddress].s = {
                    fill: { 
                        fgColor: { rgb: "757575" },
                        patternType: "solid"
                    },
                    font: { 
                        bold: true, 
                        color: { rgb: "FFFFFF" }, 
                        sz: 14,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "center", 
                        vertical: "center",
                        wrapText: true
                    }
                };
            }
            // Subtítulos (INFORMAÇÕES DA AULA, HORÁRIO, CARGA HORÁRIA, DIAS QUE SERÃO TRABALHADOS, DADOS ADICIONAIS)
            else if (ws[cellAddress].v && typeof ws[cellAddress].v === 'string' && 
                     (ws[cellAddress].v === 'INFORMAÇÕES DA AULA' || 
                      ws[cellAddress].v === 'HORÁRIO' || 
                      ws[cellAddress].v === 'CARGA HORÁRIA' ||
                      ws[cellAddress].v === 'DIAS QUE SERÃO TRABALHADOS' ||
                      ws[cellAddress].v === 'DADOS ADICIONAIS')) {
                ws[cellAddress].s = {
                    fill: { 
                        fgColor: { rgb: "BDBDBD" },
                        patternType: "solid"
                    },
                    font: { 
                        bold: true, 
                        color: { rgb: "000000" }, 
                        sz: 12,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "left", 
                        vertical: "center",
                        wrapText: true
                    }
                };
            }
            // Labels (coluna 0, exceto linhas vazias)
            else if (C === 0 && ws[cellAddress].v && ws[cellAddress].v.toString().includes(':')) {
                ws[cellAddress].s = {
                    font: { 
                        bold: true, 
                        color: { rgb: "616161" }, 
                        sz: 11,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "right", 
                        vertical: "center",
                        wrapText: true
                    }
                };
            }
            // Valores (coluna 1)
            else if (C === 1) {
                ws[cellAddress].s = {
                    font: { 
                        color: { rgb: "000000" }, 
                        sz: 11,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "left", 
                        vertical: "center",
                        wrapText: true
                    }
                };
            }
        }
    }
    
    XLSX.utils.book_append_sheet(wb, ws, 'Detalhes da Aula');
    
    // Nome do arquivo
    const nomeArquivo = `aula_${disciplina?.nome || 'aula'}_${turma?.nome || 'turma'}_${new Date().getTime()}.xlsx`
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_.-]/g, '');
    
    // Salvar na pasta específica
    try {
        const pastaDestino = 'C:\\Users\\Ild\\Desktop\\OUTUBRO 2025';
        
        // Tentar usar File System Access API para salvar na pasta específica
        if ('showSaveFilePicker' in window) {
            const options = {
                suggestedName: nomeArquivo,
                startIn: 'desktop', // Começar na Área de Trabalho
                types: [{
                    description: 'Planilhas Excel',
                    accept: {
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                    }
                }]
            };
            
            const fileHandle = await window.showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            
            // Converter workbook para buffer
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            await writable.write(blob);
            await writable.close();
            
            showToast(`📥 Relatório salvo com sucesso!\n📁 Salve em: ${pastaDestino}`, 'success');
        } else {
            // Fallback para navegadores que não suportam File System Access API
            XLSX.writeFile(wb, nomeArquivo);
            showToast(`📥 Relatório exportado!\n📁 Salve em: ${pastaDestino}`, 'success');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('❌ Salvamento cancelado pelo usuário', 'info');
        } else {
            console.error('Erro ao salvar arquivo:', error);
            // Fallback para download normal
            XLSX.writeFile(wb, nomeArquivo);
            showToast(`📥 Relatório exportado!\n📁 Salve em: C:\\Users\\Ild\\Desktop\\OUTUBRO 2025`, 'success');
        }
    }
}

// Exportar planilha completa com todas as aulas (formato visual)
async function exportarPlanilhaCompleta() {
    showToast('Gerando planilha completa...', 'info');
    
    if (aulas.length === 0) {
        showToast('⚠️ Nenhuma aula cadastrada para exportar!', 'error');
        return;
    }
    
    const wb = XLSX.utils.book_new();
    
    // Criar uma planilha para cada aula no formato visual
    aulas.forEach((aula, index) => {
        const turma = turmas.find(t => t.id === aula.turmaId);
        const professor = professores.find(p => p.id === aula.professorId);
        const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
        const sala = salas.find(s => s.id === aula.salaId);
        
        // Calcular datas dos encontros (exemplo: próximos 4 encontros)
        const hoje = new Date();
        const diasSemana = {
            'Segunda-feira': 1,
            'Terça-feira': 2,
            'Quarta-feira': 3,
            'Quinta-feira': 4,
            'Sexta-feira': 5,
            'Sábado': 6,
            'Domingo': 0
        };
        
        const diaDaSemana = diasSemana[aula.diaSemana];
        const datasEncontros = [];
        
        // Encontrar a próxima ocorrência do dia da semana
        let dataAtual = new Date(hoje);
        let encontrosAdicionados = 0;
        
        // Se hoje é o dia da semana, começar a partir de hoje
        // Senão, encontrar o próximo dia da semana
        if (dataAtual.getDay() !== diaDaSemana) {
            // Avançar para o próximo dia da semana
            const diasParaAvancar = (diaDaSemana - dataAtual.getDay() + 7) % 7;
            dataAtual.setDate(dataAtual.getDate() + diasParaAvancar);
        }
        
        while (encontrosAdicionados < 4) {
            if (dataAtual.getDay() === diaDaSemana) {
                datasEncontros.push(new Date(dataAtual));
                encontrosAdicionados++;
            }
            dataAtual.setDate(dataAtual.getDate() + 7); // Próxima semana
        }
        
        // Determinar período do dia baseado no horário
        const horaInicio = parseInt(aula.horarioInicio.split(':')[0]);
        let periodo = 'MANHÃ';
        if (horaInicio >= 12 && horaInicio < 18) periodo = 'TARDE';
        else if (horaInicio >= 18) periodo = 'NOITE';
        
        // Criar dados no formato visual
        const aulaData = [
            [`TURMA: ${turma?.nome || 'N/A'}`, '', `${aula.diaSemana.substring(0, 3).toUpperCase()} ${periodo}`],
            [],
            ['PROF:', professor?.nome || 'N/A', ''],
            [],
            ['DISCIPLINA:', disciplina?.nome || 'N/A', ''],
            [],
            ['ENCONTRO', '1º', '2º', '3º', '4º'],
            ['', 
             datasEncontros[0] ? datasEncontros[0].toLocaleDateString('pt-BR') : '',
             datasEncontros[1] ? datasEncontros[1].toLocaleDateString('pt-BR') : '',
             datasEncontros[2] ? datasEncontros[2].toLocaleDateString('pt-BR') : '',
             datasEncontros[3] ? datasEncontros[3].toLocaleDateString('pt-BR') : ''
            ],
            [],
            [`SALA ${sala?.nome || 'N/A'} - HORÁRIO: ${aula.horarioInicio} ÀS ${aula.horarioFim}`, '', '', '', '']
        ];
        
        const ws = XLSX.utils.aoa_to_sheet(aulaData);
        
        // Ajustar largura das colunas
        ws['!cols'] = [
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 }
        ];
        
        // Mesclar células
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(
            { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }, // TURMA
            { s: { r: 2, c: 1 }, e: { r: 2, c: 4 } }, // PROF
            { s: { r: 4, c: 1 }, e: { r: 4, c: 4 } }, // DISCIPLINA
            { s: { r: 9, c: 0 }, e: { r: 9, c: 4 } }  // SALA/HORÁRIO
        );
        
        // Aplicar estilos (cor de fundo verde) - Versão melhorada para compatibilidade
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cellAddress]) continue;
                
                // Garantir que a célula existe
                if (!ws[cellAddress]) {
                    ws[cellAddress] = { v: '', t: 's' };
                }
                
                // Aplicar estilo com melhor compatibilidade
                ws[cellAddress].s = {
                    fill: { 
                        fgColor: { rgb: "00B050" },
                        patternType: "solid"
                    },
                    font: { 
                        bold: true, 
                        color: { rgb: "000000" },
                        sz: 12,
                        name: "Arial"
                    },
                    alignment: { 
                        horizontal: "center", 
                        vertical: "center",
                        wrapText: true
                    },
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    }
                };
            }
        }
        
        // Adicionar a planilha com nome da disciplina
        const nomeAba = `${index + 1}_${disciplina?.nome || 'Aula'}`.substring(0, 31);
        XLSX.utils.book_append_sheet(wb, ws, nomeAba);
    });
    
    // Salvar diretamente na pasta específica - Versão melhorada para compatibilidade
    try {
    const dataAtual = new Date().toISOString().split('T')[0];
        const fileName = `escala_visual_${dataAtual}.xlsx`;
        const pastaDestino = 'C:\\Users\\Ild\\Desktop\\OUTUBRO 2025';
        
        // Configurar opções de escrita para melhor compatibilidade
        const writeOptions = {
            bookType: 'xlsx',
            type: 'array',
            cellStyles: true,
            cellNF: false,
            cellHTML: false
        };
        
        // Tentar usar File System Access API com pasta específica
        if ('showSaveFilePicker' in window) {
            // Configurar opções de salvamento
            const options = {
                suggestedName: fileName,
                startIn: 'desktop', // Tentar começar no desktop
                types: [{
                    description: 'Planilhas Excel',
                    accept: {
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                    }
                }]
            };
            
            const fileHandle = await window.showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            
            // Converter workbook para buffer com opções melhoradas
            const wbout = XLSX.write(wb, writeOptions);
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            await writable.write(blob);
            await writable.close();
            
            showToast(`📊 Planilha salva com sucesso!\n📁 Salve em: ${pastaDestino}\n💡 Abra no Excel para ver as cores!`, 'success');
        } else {
            // Fallback para navegadores que não suportam File System Access API
            XLSX.writeFile(wb, fileName, writeOptions);
            showToast(`📊 Planilha exportada!\n📁 Salve em: ${pastaDestino}\n💡 Abra no Excel para ver as cores!`, 'success');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('❌ Salvamento cancelado pelo usuário', 'info');
        } else {
            console.error('Erro ao salvar arquivo:', error);
            // Fallback para download normal
            const dataAtual = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, `escala_visual_${dataAtual}.xlsx`, { bookType: 'xlsx', cellStyles: true });
            showToast(`📊 Planilha exportada!\n📁 Salve em: C:\\Users\\Ild\\Desktop\\OUTUBRO 2025\n💡 Abra no Excel para ver as cores!`, 'success');
        }
    }
}

// Definir mês e ano atual
function setCurrentMonthYear() {
    const now = new Date();
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    
    document.getElementById('relatorio-mes').value = mes;
    document.getElementById('relatorio-ano').value = ano;
}

// Sistema de notificações
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Editar aula
function editarAula(aulaId) {
    const aula = aulas.find(a => a.id === aulaId);
    if (!aula) {
        showToast('⚠️ Aula não encontrada!', 'error');
        return;
    }
    
    // Preencher o formulário com os dados da aula
    document.getElementById('aula-turma').value = aula.turmaId;
    document.getElementById('aula-professor').value = aula.professorId;
    document.getElementById('aula-disciplina').value = aula.disciplinaId;
    document.getElementById('aula-sala').value = aula.salaId;
    document.getElementById('aula-dia').value = aula.diaSemana;
    document.getElementById('aula-inicio').value = aula.horarioInicio;
    document.getElementById('aula-fim').value = aula.horarioFim;
    document.getElementById('aula-horas-mes').value = aula.totalHorasMes;
    
    // Marcar as semanas selecionadas
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        cb.checked = aula.semanas.includes(cb.value);
    });
    
    // Adicionar ID da aula para edição
    document.getElementById('form-aula').dataset.editingId = aulaId;
    
    // Alterar o botão de submit
    const submitBtn = document.querySelector('#form-aula button[type="submit"]');
    submitBtn.textContent = '💾 Salvar Alterações';
    submitBtn.style.backgroundColor = '#28a745';
    
    // Mostrar botão de cancelar
    const cancelBtn = document.querySelector('button[onclick="cancelarEdicao()"]');
    cancelBtn.style.display = 'inline-block';
    
    // Rolar para o formulário
    document.getElementById('aulas').scrollIntoView({ behavior: 'smooth' });
    
    showToast('📝 Modo de edição ativado! Altere os dados e clique em "Salvar Alterações"', 'info');
}

// Cancelar edição
function cancelarEdicao() {
    // Limpar o formulário
    document.getElementById('form-aula').reset();
    document.getElementById('form-aula').removeAttribute('data-editing-id');
    
    // Restaurar o botão
    const submitBtn = document.querySelector('#form-aula button[type="submit"]');
    submitBtn.textContent = 'Cadastrar Aula';
    submitBtn.style.backgroundColor = '';
    
    // Esconder botão de cancelar
    const cancelBtn = document.querySelector('button[onclick="cancelarEdicao()"]');
    cancelBtn.style.display = 'none';
    
    // Marcar todas as semanas novamente
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
    
    showToast('❌ Edição cancelada', 'info');
}

// Editar item (turma, professor, disciplina, sala)
function editarItem(tipo, itemId) {
    let item;
    let inputId;
    let titulo;
    
    // Encontrar o item e definir variáveis
    switch(tipo) {
        case 'turmas':
            item = turmas.find(t => t.id === itemId);
            inputId = 'input-turma';
            titulo = 'Turma';
            break;
        case 'professores':
            item = professores.find(p => p.id === itemId);
            inputId = 'input-professor';
            titulo = 'Professor';
            break;
        case 'disciplinas':
            item = disciplinas.find(d => d.id === itemId);
            inputId = 'input-disciplina';
            titulo = 'Disciplina';
            break;
        case 'salas':
            item = salas.find(s => s.id === itemId);
            inputId = 'input-sala';
            titulo = 'Sala';
            break;
    }
    
    if (!item) {
        showToast('⚠️ Item não encontrado!', 'error');
        return;
    }
    
    // Preencher o campo correspondente
    const input = document.getElementById(inputId);
    if (input) {
        input.value = item.nome;
        input.focus();
        
        // Adicionar atributo para identificar que está editando
        input.dataset.editingId = itemId;
        input.dataset.editingType = tipo;
        
        // Adicionar classe visual para indicar modo de edição
        input.style.borderColor = '#28a745';
        input.style.backgroundColor = '#f8f9fa';
        
        showToast(`📝 Editando ${titulo}: ${item.nome}`, 'info');
    }
}

// Salvar edição de item
function salvarEdicaoItem(input) {
    const itemId = input.dataset.editingId;
    const tipo = input.dataset.editingType;
    const novoNome = input.value.trim();
    
    if (!novoNome) {
        showToast('⚠️ Nome não pode estar vazio!', 'error');
        return;
    }
    
    // Encontrar e atualizar o item
    let item;
    switch(tipo) {
        case 'turmas':
            item = turmas.find(t => t.id === itemId);
            break;
        case 'professores':
            item = professores.find(p => p.id === itemId);
            break;
        case 'disciplinas':
            item = disciplinas.find(d => d.id === itemId);
            break;
        case 'salas':
            item = salas.find(s => s.id === itemId);
            break;
    }
    
    if (item) {
        item.nome = novoNome;
        item.dataAtualizacao = new Date().toISOString();
        
        // Atualizar a interface
        renderList(`lista-${tipo}`, eval(tipo), tipo);
        updateAulaSelects();
        saveAllData();
        
        showToast(`✅ ${tipo.slice(0, -1).charAt(0).toUpperCase() + tipo.slice(1, -1)} editado com sucesso!`, 'success');
    }
    
    // Limpar modo de edição
    input.removeAttribute('data-editing-id');
    input.removeAttribute('data-editing-type');
    input.style.borderColor = '';
    input.style.backgroundColor = '';
}

// Cancelar edição de item
function cancelarEdicaoItem(input) {
    input.removeAttribute('data-editing-id');
    input.removeAttribute('data-editing-type');
    input.style.borderColor = '';
    input.style.backgroundColor = '';
    input.value = '';
    showToast('❌ Edição cancelada', 'info');
}

// Enviar aula para WhatsApp
function enviarWhatsApp(aulaId) {
    const aula = aulas.find(a => a.id === aulaId);
    if (!aula) {
        showToast('⚠️ Aula não encontrada!', 'error');
        return;
    }
    
    const turma = turmas.find(t => t.id === aula.turmaId);
    const professor = professores.find(p => p.id === aula.professorId);
    const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
    const sala = salas.find(s => s.id === aula.salaId);
    
    // Calcular os dias que serão trabalhados
    const diasTrabalhados = calcularDiasTrabalhados(aula);
    
    // Criar mensagem formatada para WhatsApp
    const mensagem = `📚 *INFORMAÇÕES DA AULA*

🎓 *Disciplina:* ${disciplina?.nome || 'N/A'}
👨‍🏫 *Professor:* ${professor?.nome || 'N/A'}
🏫 *Turma:* ${turma?.nome || 'N/A'}
🚪 *Sala:* ${sala?.nome || 'N/A'}

📅 *Horário:*
• Dia: ${aula.diaSemana}
• Início: ${aula.horarioInicio}
• Fim: ${aula.horarioFim}
• Total de Horas/Mês: ${aula.totalHorasMes || 0}h

📋 *Semanas:* ${aula.semanas.join(', ')}

📅 *PRÓXIMAS AULAS:*
${diasTrabalhados.map((dia, index) => `${index + 1}ª Aula: ${dia}`).join('\n')}

📱 *Enviado pelo Sistema de Controle de Aulas - ILEDE*`;
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Criar URL do WhatsApp
    const urlWhatsApp = `https://wa.me/?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    showToast('📱 Abrindo WhatsApp com as informações da aula!', 'success');
}

// Enviar todas as aulas para WhatsApp
function enviarTodasAulasWhatsApp() {
    if (aulas.length === 0) {
        showToast('⚠️ Nenhuma aula cadastrada para enviar!', 'error');
        return;
    }
    
    // Confirmar envio
    const confirmMessage = `Deseja enviar ${aulas.length} aula(s) para o WhatsApp?\n\nCada aula será aberta em uma nova aba do WhatsApp.`;
    
    if (!confirm(confirmMessage)) {
        showToast('❌ Envio cancelado', 'info');
        return;
    }
    
    showToast(`📱 Enviando ${aulas.length} aula(s) para o WhatsApp...`, 'info');
    
    // Enviar cada aula com um pequeno delay para não sobrecarregar
    aulas.forEach((aula, index) => {
        setTimeout(() => {
            enviarWhatsApp(aula.id);
        }, index * 2000); // 2 segundos entre cada envio
    });
    
    showToast(`✅ ${aulas.length} aula(s) sendo enviadas para o WhatsApp!`, 'success');
}


// ===== FUNÇÕES WHATSAPP =====

let whatsappStatus = {
    conectado: false,
    status: 'Desconectado',
    qrCode: null
};

// Verificar status do WhatsApp
async function verificarStatusWhatsApp() {
    try {
        const response = await fetch('/api/whatsapp/status');
        const status = await response.json();
        
        whatsappStatus = status;
        atualizarInterfaceWhatsApp();
        
        return status;
    } catch (error) {
        console.error('Erro ao verificar status WhatsApp:', error);
        return null;
    }
}

// Atualizar interface do WhatsApp
function atualizarInterfaceWhatsApp() {
    const indicator = document.getElementById('whatsapp-indicator');
    const statusText = document.getElementById('whatsapp-status-text');
    const btnConectar = document.getElementById('btn-conectar');
    const btnDesconectar = document.getElementById('btn-desconectar');
    const btnTeste = document.getElementById('btn-teste');
    const btnEnviarRelatorio = document.getElementById('btn-enviar-relatorio');
    const btnEnviarMensagem = document.getElementById('btn-enviar-mensagem');
    const btnEnviarTodas = document.getElementById('btn-enviar-todas');
    const qrContainer = document.getElementById('qr-code-container');

    if (whatsappStatus.conectado) {
        indicator.textContent = '🟢';
        indicator.style.color = '#25D366';
        statusText.textContent = 'Conectado';
        statusText.style.color = '#25D366';
        
        btnConectar.disabled = true;
        btnDesconectar.disabled = false;
        btnTeste.disabled = false;
        btnEnviarRelatorio.disabled = false;
        btnEnviarMensagem.disabled = false;
        btnEnviarTodas.disabled = false;
        
        qrContainer.style.display = 'none';
    } else {
        indicator.textContent = '🔴';
        indicator.style.color = '#dc3545';
        statusText.textContent = whatsappStatus.status;
        statusText.style.color = '#dc3545';
        
        btnConectar.disabled = false;
        btnDesconectar.disabled = true;
        btnTeste.disabled = true;
        btnEnviarRelatorio.disabled = true;
        btnEnviarMensagem.disabled = true;
        btnEnviarTodas.disabled = true;
        
        if (whatsappStatus.status === 'Aguardando QR Code') {
            qrContainer.style.display = 'block';
            mostrarQRCode();
        } else {
            qrContainer.style.display = 'none';
        }
    }
}

// Mostrar QR Code
function mostrarQRCode() {
    const qrDisplay = document.getElementById('qr-code-display');
    
    if (whatsappStatus.qrCode) {
        qrDisplay.innerHTML = `
            <img src="data:image/png;base64,${whatsappStatus.qrCode}" 
                 alt="QR Code WhatsApp" 
                 style="max-width: 250px; height: auto;">
        `;
    } else {
        qrDisplay.innerHTML = '<p>Gerando QR Code...</p>';
    }
}

// Conectar WhatsApp
async function conectarWhatsApp() {
    try {
        showToast('🔄 Conectando ao WhatsApp...', 'info');
        
        const response = await fetch('/api/whatsapp/conectar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('✅ WhatsApp conectado com sucesso!', 'success');
            await verificarStatusWhatsApp();
            
            // Verificar status periodicamente até conectar
            const interval = setInterval(async () => {
                const status = await verificarStatusWhatsApp();
                if (status && status.conectado) {
                    clearInterval(interval);
                }
            }, 2000);
            
            // Parar verificação após 5 minutos
            setTimeout(() => clearInterval(interval), 300000);
            
    } else {
            showToast(`❌ Erro ao conectar: ${result.message}`, 'error');
        }
        
    } catch (error) {
        console.error('Erro ao conectar WhatsApp:', error);
        showToast('❌ Erro ao conectar WhatsApp', 'error');
    }
}

// Desconectar WhatsApp
async function desconectarWhatsApp() {
    try {
        showToast('🔄 Desconectando WhatsApp...', 'info');
        
        const response = await fetch('/api/whatsapp/desconectar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('✅ WhatsApp desconectado!', 'success');
            await verificarStatusWhatsApp();
        } else {
            showToast(`❌ Erro ao desconectar: ${result.message}`, 'error');
        }
        
    } catch (error) {
        console.error('Erro ao desconectar WhatsApp:', error);
        showToast('❌ Erro ao desconectar WhatsApp', 'error');
    }
}

// Testar WhatsApp
async function testarWhatsApp() {
    const telefone = prompt('Digite o número do WhatsApp para teste (ex: 11999999999):');
    
    if (!telefone) {
        showToast('❌ Número não informado', 'error');
        return;
    }
    
    try {
        showToast('🔄 Enviando mensagem de teste...', 'info');
        
        const response = await fetch('/api/whatsapp/teste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telefone })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('✅ Mensagem de teste enviada!', 'success');
        } else {
            showToast(`❌ Erro no teste: ${result.message}`, 'error');
        }
        
    } catch (error) {
        console.error('Erro ao testar WhatsApp:', error);
        showToast('❌ Erro ao enviar teste', 'error');
    }
}

// Carregar aulas nos selects
function carregarAulasWhatsApp() {
    const selectRelatorio = document.getElementById('aula-relatorio');
    
    // Limpar opções existentes
    selectRelatorio.innerHTML = '<option value="">Selecione uma aula...</option>';
    
    // Adicionar aulas
    aulas.forEach(aula => {
        const turma = turmas.find(t => t.id === aula.turmaId);
        const professor = professores.find(p => p.id === aula.professorId);
        const disciplina = disciplinas.find(d => d.id === aula.disciplinaId);
        
        const optionText = `${turma?.nome || 'N/A'} - ${professor?.nome || 'N/A'} - ${disciplina?.nome || 'N/A'}`;
        
        const optionRelatorio = new Option(optionText, aula.id);
        
        selectRelatorio.add(optionRelatorio);
    });
}

// Enviar relatório de aula
async function enviarRelatorioAula(event) {
    event.preventDefault();
    
    const telefone = document.getElementById('telefone-relatorio').value;
    const aulaId = document.getElementById('aula-relatorio').value;
    
    if (!telefone || !aulaId) {
        showToast('❌ Preencha todos os campos', 'error');
        return;
    }
    
    try {
        showToast('🔄 Enviando relatório...', 'info');
        
        const response = await fetch('/api/whatsapp/enviar-relatorio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telefone, aulaId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('✅ Relatório enviado com sucesso!', 'success');
            document.getElementById('form-enviar-relatorio').reset();
    } else {
            showToast(`❌ Erro ao enviar: ${result.message}`, 'error');
        }
        
    } catch (error) {
        console.error('Erro ao enviar relatório:', error);
        showToast('❌ Erro ao enviar relatório', 'error');
    }
}

// Enviar mensagem personalizada
async function enviarMensagemPersonalizada(event) {
    event.preventDefault();
    
    const telefone = document.getElementById('telefone-mensagem').value;
    const mensagem = document.getElementById('mensagem-texto').value;
    
    if (!telefone || !mensagem) {
        showToast('❌ Preencha telefone e mensagem', 'error');
        return;
    }
    
    try {
        showToast('🔄 Enviando mensagem...', 'info');
        
        const response = await fetch('/api/whatsapp/enviar-mensagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telefone, mensagem })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('✅ Mensagem enviada com sucesso!', 'success');
            document.getElementById('form-mensagem-personalizada').reset();
    } else {
            showToast(`❌ Erro ao enviar: ${result.message}`, 'error');
        }
        
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        showToast('❌ Erro ao enviar mensagem', 'error');
    }
}

// Enviar todas as aulas
async function enviarTodasAulas(event) {
    event.preventDefault();
    
    const telefone = document.getElementById('telefone-todas').value;
    const incluirPdf = document.getElementById('incluir-pdf').checked;
    
    if (!telefone) {
        showToast('❌ Preencha o número do WhatsApp', 'error');
        return;
    }
    
    if (aulas.length === 0) {
        showToast('❌ Nenhuma aula cadastrada', 'error');
        return;
    }
    
    const confirmMessage = `Deseja enviar ${aulas.length} aula(s) para ${telefone}?`;
    if (!confirm(confirmMessage)) {
        return;
    }
    
    try {
        showToast(`🔄 Enviando ${aulas.length} aula(s)...`, 'info');
        
        let sucessos = 0;
        let erros = 0;
        
        for (let i = 0; i < aulas.length; i++) {
            const aula = aulas[i];
            
            try {
                const response = await fetch('/api/whatsapp/enviar-relatorio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
                    body: JSON.stringify({ telefone, aulaId: aula.id })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    sucessos++;
        } else {
                    erros++;
                }
                
                // Aguardar 3 segundos entre envios
                if (i < aulas.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
                
            } catch (error) {
                erros++;
                console.error(`Erro ao enviar aula ${aula.id}:`, error);
            }
        }
        
        if (sucessos > 0) {
            showToast(`✅ ${sucessos} aula(s) enviadas com sucesso!`, 'success');
        }
        
        if (erros > 0) {
            showToast(`⚠️ ${erros} aula(s) falharam no envio`, 'error');
        }
        
        document.getElementById('form-enviar-todas').reset();
        
    } catch (error) {
        console.error('Erro ao enviar todas as aulas:', error);
        showToast('❌ Erro ao enviar aulas', 'error');
    }
}

// Adicionar event listeners quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar status do WhatsApp
    verificarStatusWhatsApp();
    
    // Verificar status a cada 30 segundos
    setInterval(verificarStatusWhatsApp, 30000);
    
    // Carregar aulas nos selects
    carregarAulasWhatsApp();
    
    // Adicionar event listeners dos formulários
    document.getElementById('form-enviar-relatorio').addEventListener('submit', enviarRelatorioAula);
    document.getElementById('form-mensagem-personalizada').addEventListener('submit', enviarMensagemPersonalizada);
    document.getElementById('form-enviar-todas').addEventListener('submit', enviarTodasAulas);
    
    // Recarregar aulas quando os dados mudarem
    const observer = new MutationObserver(() => {
        carregarAulasWhatsApp();
    });
    
    const aulasContainer = document.getElementById('aulas-container');
    if (aulasContainer) {
        observer.observe(aulasContainer, { childList: true });
    }
});



