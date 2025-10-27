const { create, Whatsapp } = require('@wppconnect-team/wppconnect');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class WhatsAppSender {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.sessionName = 'sistema-aulas';
        this.qrCode = null;
        this.status = 'Desconectado';
    }

    /**
     * Inicializa a conexão com o WhatsApp
     */
    async inicializar() {
        try {
            console.log('🔄 Iniciando conexão com WhatsApp...');
            
            this.client = await create({
                session: this.sessionName,
                catchQR: (base64Qr, asciiQR) => {
                    console.log('📱 QR Code gerado! Escaneie com seu WhatsApp:');
                    console.log(asciiQR);
                    this.qrCode = base64Qr;
                },
                statusFind: (statusSession, session) => {
                    console.log(`📊 Status da sessão: ${statusSession}`);
                    this.status = statusSession;
                },
                headless: true,
                devtools: false,
                useChrome: true,
                debug: false,
                logQR: true,
                browserArgs: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ],
                puppeteerOptions: {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--disable-gpu'
                    ]
                }
            });

            this.isConnected = true;
            this.status = 'Conectado';
            console.log('✅ WhatsApp conectado com sucesso!');
            
            return true;
        } catch (error) {
            console.error('❌ Erro ao conectar WhatsApp:', error);
            this.status = 'Erro na conexão';
            return false;
        }
    }

    /**
     * Gera PDF da aula para envio
     */
    async gerarPDFAula(aula) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({
                    size: 'A4',
                    margins: {
                        top: 50,
                        bottom: 50,
                        left: 50,
                        right: 50
                    }
                });

                // Criar pasta de PDFs se não existir
                const pdfsDir = path.join(__dirname, 'pdfs');
                if (!fs.existsSync(pdfsDir)) {
                    fs.mkdirSync(pdfsDir, { recursive: true });
                }

                const fileName = `aula_${aula.id}_${Date.now()}.pdf`;
                const filePath = path.join(pdfsDir, fileName);
                
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                // Cabeçalho
                doc.fontSize(20)
                   .fillColor('#2E7D32')
                   .text('📚 RELATÓRIO DE AULA', { align: 'center' });
                
                doc.moveDown(1);

                // Informações da aula
                doc.fontSize(16)
                   .fillColor('#1976D2')
                   .text('INFORMAÇÕES DA AULA', { underline: true });
                
                doc.fontSize(12)
                   .fillColor('#000000')
                   .text(`📝 Nome: ${aula.nome}`, { indent: 20 });
                
                doc.text(`🏫 Instituição: ${aula.instituicao}`, { indent: 20 });
                
                doc.text(`📅 Data: ${new Date(aula.data).toLocaleDateString('pt-BR')}`, { indent: 20 });
                
                doc.text(`⏰ Horário: ${aula.horarioInicio} - ${aula.horarioFim}`, { indent: 20 });
                
                doc.text(`📚 Disciplina: ${aula.disciplina}`, { indent: 20 });
                
                doc.text(`👥 Turma: ${aula.turma}`, { indent: 20 });
                
                doc.text(`📊 Carga Horária: ${aula.cargaHoraria} horas`, { indent: 20 });

                doc.moveDown(1);

                // Horário detalhado
                doc.fontSize(16)
                   .fillColor('#1976D2')
                   .text('HORÁRIO DETALHADO', { underline: true });
                
                doc.fontSize(12)
                   .fillColor('#000000')
                   .text(`🕐 Início: ${aula.horarioInicio}`, { indent: 20 });
                
                doc.text(`🕕 Fim: ${aula.horarioFim}`, { indent: 20 });
                
                doc.text(`⏱️ Duração: ${aula.duracao} minutos`, { indent: 20 });

                doc.moveDown(1);

                // Dias trabalhados
                if (aula.diasTrabalhados && aula.diasTrabalhados.length > 0) {
                    doc.fontSize(16)
                       .fillColor('#1976D2')
                       .text('DIAS QUE SERÃO TRABALHADOS', { underline: true });
                    
                    doc.fontSize(12)
                       .fillColor('#000000');
                    
                    aula.diasTrabalhados.forEach(dia => {
                        doc.text(`📅 ${dia}`, { indent: 20 });
                    });
                    
                    doc.moveDown(1);
                }

                // Dados adicionais
                if (aula.dadosAdicionais) {
                    doc.fontSize(16)
                       .fillColor('#1976D2')
                       .text('DADOS ADICIONAIS', { underline: true });
                    
                    doc.fontSize(12)
                       .fillColor('#000000')
                       .text(aula.dadosAdicionais, { indent: 20 });
                    
                    doc.moveDown(1);
                }

                // Rodapé
                doc.fontSize(10)
                   .fillColor('#666666')
                   .text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 
                         { align: 'center' });

                doc.end();

                stream.on('finish', () => {
                    console.log(`📄 PDF gerado: ${fileName}`);
                    resolve(filePath);
                });

                stream.on('error', (error) => {
                    console.error('❌ Erro ao gerar PDF:', error);
                    reject(error);
                });

            } catch (error) {
                console.error('❌ Erro ao criar PDF:', error);
                reject(error);
            }
        });
    }

    /**
     * Envia mensagem com PDF anexado
     */
    async enviarMensagemComPDF(telefone, mensagem, pdfPath) {
        try {
            if (!this.isConnected || !this.client) {
                throw new Error('WhatsApp não está conectado');
            }

            // Validar número de telefone
            const numeroLimpo = telefone.replace(/\D/g, '');
            const numeroCompleto = numeroLimpo.startsWith('55') ? 
                numeroLimpo : `55${numeroLimpo}`;

            console.log(`📤 Enviando mensagem para: ${numeroCompleto}`);

            // Enviar mensagem de texto primeiro
            await this.client.sendText(`${numeroCompleto}@c.us`, mensagem);

            // Aguardar um pouco antes de enviar o PDF
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Enviar PDF como documento
            await this.client.sendFile(`${numeroCompleto}@c.us`, pdfPath, 'relatorio-aula.pdf', mensagem);

            console.log('✅ Mensagem e PDF enviados com sucesso!');
            return true;

        } catch (error) {
            console.error('❌ Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    /**
     * Envia relatório completo de uma aula
     */
    async enviarRelatorioAula(telefone, aula) {
        try {
            console.log(`📋 Gerando relatório para aula: ${aula.nome}`);

            // Gerar PDF
            const pdfPath = await this.gerarPDFAula(aula);

            // Criar mensagem personalizada
            const mensagem = `📚 *RELATÓRIO DE AULA*

Olá! Segue o relatório detalhado da aula:

📝 *${aula.nome}*
🏫 ${aula.instituicao}
📅 ${new Date(aula.data).toLocaleDateString('pt-BR')}
⏰ ${aula.horarioInicio} - ${aula.horarioFim}
📚 ${aula.disciplina}
👥 ${aula.turma}
📊 ${aula.cargaHoraria} horas

📎 *Anexo:* Relatório completo em PDF

---
_Sistema de Controle de Aulas_`;

            // Enviar mensagem com PDF
            await this.enviarMensagemComPDF(telefone, mensagem, pdfPath);

            // Limpar arquivo PDF após envio
            setTimeout(() => {
                if (fs.existsSync(pdfPath)) {
                    fs.unlinkSync(pdfPath);
                    console.log('🗑️ PDF temporário removido');
                }
            }, 30000); // Remove após 30 segundos

            return true;

        } catch (error) {
            console.error('❌ Erro ao enviar relatório:', error);
            throw error;
        }
    }

    /**
     * Envia mensagem de teste
     */
    async enviarMensagemTeste(telefone) {
        try {
            const mensagem = `🧪 *TESTE DE CONEXÃO*

Olá! Esta é uma mensagem de teste do Sistema de Controle de Aulas.

✅ WhatsApp conectado com sucesso!
📱 Sistema funcionando normalmente

---
_Sistema de Controle de Aulas_`;

            await this.client.sendText(`${telefone}@c.us`, mensagem);
            console.log('✅ Mensagem de teste enviada!');
            return true;

        } catch (error) {
            console.error('❌ Erro ao enviar teste:', error);
            throw error;
        }
    }

    /**
     * Desconecta do WhatsApp
     */
    async desconectar() {
        try {
            if (this.client) {
                await this.client.close();
                this.client = null;
                this.isConnected = false;
                this.status = 'Desconectado';
                console.log('📴 WhatsApp desconectado');
            }
        } catch (error) {
            console.error('❌ Erro ao desconectar:', error);
        }
    }

    /**
     * Obtém status da conexão
     */
    obterStatus() {
        return {
            conectado: this.isConnected,
            status: this.status,
            qrCode: this.qrCode
        };
    }
}

module.exports = WhatsAppSender;
