const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const WhatsAppSender = require('./whatsapp-sender');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Caminho do banco de dados JSON
const DB_PATH = path.join(__dirname, 'dados.json');
const REPORTS_DIR = path.join(__dirname, 'relatorios');

// Instanciar WhatsApp
const whatsapp = new WhatsAppSender();

// Inicializar banco de dados
function initDatabase() {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            turmas: [],
            professores: [],
            disciplinas: [],
            salas: [],
            aulas: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
    
    if (!fs.existsSync(REPORTS_DIR)) {
        fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }
}

// Ler banco de dados
function readDatabase() {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

// Salvar banco de dados
function saveDatabase(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ===== ROTAS DE TURMAS =====
app.get('/api/turmas', (req, res) => {
    const db = readDatabase();
    res.json(db.turmas);
});

app.post('/api/turmas', (req, res) => {
    const db = readDatabase();
    const novaTurma = {
        id: Date.now().toString(),
        nome: req.body.nome,
        dataCriacao: new Date().toISOString()
    };
    db.turmas.push(novaTurma);
    saveDatabase(db);
    res.json(novaTurma);
});

app.delete('/api/turmas/:id', (req, res) => {
    const db = readDatabase();
    db.turmas = db.turmas.filter(t => t.id !== req.params.id);
    saveDatabase(db);
    res.json({ success: true });
});

// ===== ROTAS DE PROFESSORES =====
app.get('/api/professores', (req, res) => {
    const db = readDatabase();
    res.json(db.professores);
});

app.post('/api/professores', (req, res) => {
    const db = readDatabase();
    const novoProfessor = {
        id: Date.now().toString(),
        nome: req.body.nome,
        dataCriacao: new Date().toISOString()
    };
    db.professores.push(novoProfessor);
    saveDatabase(db);
    res.json(novoProfessor);
});

app.delete('/api/professores/:id', (req, res) => {
    const db = readDatabase();
    db.professores = db.professores.filter(p => p.id !== req.params.id);
    saveDatabase(db);
    res.json({ success: true });
});

// ===== ROTAS DE DISCIPLINAS =====
app.get('/api/disciplinas', (req, res) => {
    const db = readDatabase();
    res.json(db.disciplinas);
});

app.post('/api/disciplinas', (req, res) => {
    const db = readDatabase();
    const novaDisciplina = {
        id: Date.now().toString(),
        nome: req.body.nome,
        dataCriacao: new Date().toISOString()
    };
    db.disciplinas.push(novaDisciplina);
    saveDatabase(db);
    res.json(novaDisciplina);
});

app.delete('/api/disciplinas/:id', (req, res) => {
    const db = readDatabase();
    db.disciplinas = db.disciplinas.filter(d => d.id !== req.params.id);
    saveDatabase(db);
    res.json({ success: true });
});

// ===== ROTAS DE SALAS =====
app.get('/api/salas', (req, res) => {
    const db = readDatabase();
    res.json(db.salas);
});

app.post('/api/salas', (req, res) => {
    const db = readDatabase();
    const novaSala = {
        id: Date.now().toString(),
        nome: req.body.nome,
        dataCriacao: new Date().toISOString()
    };
    db.salas.push(novaSala);
    saveDatabase(db);
    res.json(novaSala);
});

app.delete('/api/salas/:id', (req, res) => {
    const db = readDatabase();
    db.salas = db.salas.filter(s => s.id !== req.params.id);
    saveDatabase(db);
    res.json({ success: true });
});

// ===== ROTA PARA SALVAR TODOS OS DADOS =====
app.post('/api/dados', (req, res) => {
    try {
        const dados = req.body;
        saveDatabase(dados);
        res.json({ success: true, message: 'Dados salvos com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/dados', (req, res) => {
    const db = readDatabase();
    res.json(db);
});

// ===== ROTAS DE AULAS =====
app.get('/api/aulas', (req, res) => {
    const db = readDatabase();
    res.json(db.aulas);
});

app.post('/api/aulas', (req, res) => {
    const db = readDatabase();
    const novaAula = {
        id: Date.now().toString(),
        turmaId: req.body.turmaId,
        professorId: req.body.professorId,
        disciplinaId: req.body.disciplinaId,
        salaId: req.body.salaId,
        diaSemana: req.body.diaSemana,
        horarioInicio: req.body.horarioInicio,
        horarioFim: req.body.horarioFim,
        totalHorasMes: req.body.totalHorasMes || 0,
        semanas: req.body.semanas || ['1ª', '2ª', '3ª', '4ª'],
        dataCriacao: new Date().toISOString()
    };
    db.aulas.push(novaAula);
    saveDatabase(db);
    res.json(novaAula);
});

app.delete('/api/aulas/:id', (req, res) => {
    const db = readDatabase();
    db.aulas = db.aulas.filter(a => a.id !== req.params.id);
    saveDatabase(db);
    res.json({ success: true });
});

// ===== GERAÇÃO DE RELATÓRIO PDF =====
app.get('/api/relatorio/:mes/:ano', (req, res) => {
    const { mes, ano } = req.params;
    const db = readDatabase();
    
    const doc = new PDFDocument({ margin: 50 });
    const filename = `relatorio_${mes}_${ano}.pdf`;
    const filepath = path.join(REPORTS_DIR, filename);
    
    doc.pipe(fs.createWriteStream(filepath));
    
    // Cabeçalho
    doc.fontSize(20).text('Relatório de Aulas', { align: 'center' });
    doc.fontSize(14).text(`Mês: ${mes}/${ano}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, { align: 'center' });
    doc.moveDown(2);
    
    // Estatísticas
    doc.fontSize(16).text('Resumo Geral', { underline: true });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Total de Turmas: ${db.turmas.length}`);
    doc.text(`Total de Professores: ${db.professores.length}`);
    doc.text(`Total de Disciplinas: ${db.disciplinas.length}`);
    doc.text(`Total de Salas: ${db.salas.length}`);
    doc.text(`Total de Aulas Cadastradas: ${db.aulas.length}`);
    doc.moveDown(2);
    
    // Detalhamento das Aulas
    doc.fontSize(16).text('Escala de Aulas', { underline: true });
    doc.moveDown();
    
    if (db.aulas.length === 0) {
        doc.fontSize(12).text('Nenhuma aula cadastrada neste período.');
    } else {
        db.aulas.forEach((aula, index) => {
            const turma = db.turmas.find(t => t.id === aula.turmaId);
            const professor = db.professores.find(p => p.id === aula.professorId);
            const disciplina = db.disciplinas.find(d => d.id === aula.disciplinaId);
            const sala = db.salas.find(s => s.id === aula.salaId);
            
            doc.fontSize(12).text(`Aula ${index + 1}:`, { underline: true });
            doc.fontSize(10);
            doc.text(`  Turma: ${turma?.nome || 'N/A'}`);
            doc.text(`  Professor: ${professor?.nome || 'N/A'}`);
            doc.text(`  Disciplina: ${disciplina?.nome || 'N/A'}`);
            doc.text(`  Sala: ${sala?.nome || 'N/A'}`);
            doc.text(`  Dia da Semana: ${aula.diaSemana}`);
            doc.text(`  Horário: ${aula.horarioInicio} - ${aula.horarioFim}`);
            doc.text(`  Semanas: ${aula.semanas.join(', ')}`);
            doc.moveDown();
            
            // Adicionar nova página se necessário
            if (doc.y > 700) {
                doc.addPage();
            }
        });
    }
    
    // Rodapé
    doc.fontSize(8).text('Sistema de Controle de Aulas', 50, doc.page.height - 50, { align: 'center' });
    
    doc.end();
    
    doc.on('finish', () => {
        res.download(filepath, filename);
    });
    
    doc.on('error', (error) => {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).json({ success: false, message: 'Erro ao gerar relatório' });
    });
});

// Listar relatórios disponíveis
app.get('/api/relatorios', (req, res) => {
    if (!fs.existsSync(REPORTS_DIR)) {
        return res.json([]);
    }
    
    const files = fs.readdirSync(REPORTS_DIR)
        .filter(file => file.endsWith('.pdf'))
        .map(file => ({
            nome: file,
            caminho: path.join(REPORTS_DIR, file),
            data: fs.statSync(path.join(REPORTS_DIR, file)).mtime
        }))
        .sort((a, b) => b.data - a.data);
    
    res.json(files);
});


// ===== ROTAS DO WHATSAPP =====

// Conectar WhatsApp
app.post('/api/whatsapp/conectar', async (req, res) => {
    try {
        const sucesso = await whatsapp.inicializar();
        if (sucesso) {
            res.json({ success: true, message: 'WhatsApp conectado com sucesso!' });
        } else {
            res.json({ success: false, message: 'Erro ao conectar WhatsApp' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Desconectar WhatsApp
app.post('/api/whatsapp/desconectar', async (req, res) => {
    try {
        await whatsapp.desconectar();
        res.json({ success: true, message: 'WhatsApp desconectado!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Obter status do WhatsApp
app.get('/api/whatsapp/status', (req, res) => {
    try {
        const status = whatsapp.obterStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Enviar mensagem de teste
app.post('/api/whatsapp/teste', async (req, res) => {
    try {
        const { telefone } = req.body;
        if (!telefone) {
            return res.status(400).json({ success: false, message: 'Telefone é obrigatório' });
        }

        await whatsapp.enviarMensagemTeste(telefone);
        res.json({ success: true, message: 'Mensagem de teste enviada!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Enviar relatório de aula via WhatsApp
app.post('/api/whatsapp/enviar-relatorio', async (req, res) => {
    try {
        const { telefone, aulaId } = req.body;
        
        if (!telefone || !aulaId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Telefone e ID da aula são obrigatórios' 
            });
        }

        const db = readDatabase();
        const aula = db.aulas.find(a => a.id === aulaId);
        
        if (!aula) {
            return res.status(404).json({ 
                success: false, 
                message: 'Aula não encontrada' 
            });
        }

        // Enriquecer dados da aula
        const aulaCompleta = {
            ...aula,
            turma: db.turmas.find(t => t.id === aula.turmaId)?.nome || 'N/A',
            professor: db.professores.find(p => p.id === aula.professorId)?.nome || 'N/A',
            disciplina: db.disciplinas.find(d => d.id === aula.disciplinaId)?.nome || 'N/A',
            sala: db.salas.find(s => s.id === aula.salaId)?.nome || 'N/A'
        };

        await whatsapp.enviarRelatorioAula(telefone, aulaCompleta);
        res.json({ success: true, message: 'Relatório enviado com sucesso!' });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Enviar mensagem personalizada com PDF
app.post('/api/whatsapp/enviar-mensagem', async (req, res) => {
    try {
        const { telefone, mensagem, aulaId } = req.body;
        
        if (!telefone || !mensagem) {
            return res.status(400).json({ 
                success: false, 
                message: 'Telefone e mensagem são obrigatórios' 
            });
        }

        let pdfPath = null;
        
        // Se aulaId foi fornecido, gerar PDF da aula
        if (aulaId) {
            const db = readDatabase();
            const aula = db.aulas.find(a => a.id === aulaId);
            
            if (aula) {
                const aulaCompleta = {
                    ...aula,
                    turma: db.turmas.find(t => t.id === aula.turmaId)?.nome || 'N/A',
                    professor: db.professores.find(p => p.id === aula.professorId)?.nome || 'N/A',
                    disciplina: db.disciplinas.find(d => d.id === aula.disciplinaId)?.nome || 'N/A',
                    sala: db.salas.find(s => s.id === aula.salaId)?.nome || 'N/A'
                };
                
                pdfPath = await whatsapp.gerarPDFAula(aulaCompleta);
            }
        }

        if (pdfPath) {
            await whatsapp.enviarMensagemComPDF(telefone, mensagem, pdfPath);
            
            // Limpar arquivo PDF após envio
            setTimeout(() => {
                if (fs.existsSync(pdfPath)) {
                    fs.unlinkSync(pdfPath);
                }
            }, 30000);
        } else {
            await whatsapp.client.sendText(`${telefone}@c.us`, mensagem);
        }

        res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Inicializar servidor
initDatabase();

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Banco de dados: ${DB_PATH}`);
    console.log(`Relatórios salvos em: ${REPORTS_DIR}`);
});
