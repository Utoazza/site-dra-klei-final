"use client";

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccordionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget.parentElement;
    if (item) {
      item.classList.toggle('active');
      const content = item.querySelector('.accordion-content') as HTMLDivElement;
      const icon = item.querySelector('.icon');
      if (content && icon) {
        if (content.style.maxHeight) {
          content.style.maxHeight = '';
          icon.textContent = '+';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.textContent = '–';
        }
      }
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const requiredFields = form.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('[required]');
      let allFieldsValid = true;
      requiredFields.forEach(field => {
          const parent = field.parentElement;
          if(parent) parent.classList.remove('error');
          let hasError = false;
          if (!field.value.trim()) { hasError = true; }
          if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) { hasError = true; }
          if (field.tagName === 'SELECT' && field.value === "") { hasError = true; }
          if(hasError && parent) {
              allFieldsValid = false;
              parent.classList.add('error');
          }
      });
      if(allFieldsValid) {
          const phoneNumber = '5554999703803';
          const formData = new FormData(form);
          const clientName = formData.get('name');
          const clientEmail = formData.get('email');
          const clientPhone = formData.get('phone');
          const selectedService = formData.get('service');
          const caseDescription = formData.get('case-description') || 'Nenhuma descrição adicional.';
          const message = `Olá Dra. Klei!\nNome: ${clientName}\nEmail: ${clientEmail}\nTelefone: ${clientPhone}\n\nGostaria de informações sobre: *${selectedService}*\n\nDescrição: ${caseDescription}`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
          window.open(whatsappURL, '_blank');
      }
  };

  useEffect(() => {
    const whatsappBtn = document.getElementById('whatsapp-float-btn');
    const handleScroll = () => {
      if (whatsappBtn) {
        if (window.scrollY > 300) {
          whatsappBtn.classList.add('visible');
        } else {
          whatsappBtn.classList.remove('visible');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <a href="#" className="nav-logo-link">
            <img src="/logo.png" alt="Logo Dra. Klei Prior" className="nav-logo" />
          </a>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Procedimentos</a></li>
            <li><a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Resultados</a></li>
            <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Depoimentos</a></li>
            <li><a href="#contact" className="nav-button" onClick={() => setIsMenuOpen(false)}>Contato</a></li>
          </ul>
          <button className="hamburger" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>A Arte de Realçar Sua Beleza Natural</h1>
          <p>Olá, sou a Dra. Klei Prior. Com técnicas avançadas e um olhar sensível, desenvolvo planos de tratamento personalizados que entregam resultados elegantes, seguros e, acima de tudo, naturais.</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Agendar sua Avaliação</a>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="/dra_klei.jpg" alt="Foto da Dra. Klei Prior" className="hero-image" />
        </div>
      </header>

      <main>
        <section id="about" className="content-section">
          <h2 className="section-title">Minha Filosofia de Cuidado</h2>
          <p className="section-text">Minha paixão pela biomedicina estética nasceu do desejo de ir além dos procedimentos: meu propósito é fortalecer a autoestima e celebrar a beleza única de cada mulher. Se você busca uma transformação que te faça se sentir ainda mais confiante na sua própria pele, você está no lugar certo. Vamos juntas desenhar o seu plano de beleza?</p>
        </section>

        <section id="skills" className="content-section alt-bg">
          <h2 className="section-title">Procedimentos</h2>
          <div className="accordion-list">
            <div className="accordion-item">
              <div className="accordion-header" onClick={handleAccordionClick}>
                <h3>Toxina Botulínica</h3><span className="icon">+</span>
              </div>
              <div className="accordion-content"><p>Suaviza as linhas de expressão dinâmicas (como pés de galinha e rugas na testa), prevenindo a formação de marcas profundas e devolvendo um ar rejuvenescido e descansado ao seu rosto.</p></div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" onClick={handleAccordionClick}>
                <h3>Preenchimento Labial</h3><span className="icon">+</span>
              </div>
              <div className="accordion-content"><p>Técnica delicada para hidratar, definir o contorno e devolver o volume perdido, resultando em lábios com aparência mais jovem e saudável, sempre em harmonia com seus traços faciais.</p></div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header" onClick={handleAccordionClick}>
                    <h3>Preenchimento de Olheiras</h3><span className="icon">+</span>
                </div>
                <div className="accordion-content"><p>Trata a profundidade abaixo dos olhos que causa o aspecto de cansaço. Devolve o volume à região, suavizando sombras e iluminando o seu olhar de forma imediata.</p></div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header" onClick={handleAccordionClick}>
                    <h3>Contorno Facial</h3><span className="icon">+</span>
                </div>
                <div className="accordion-content"><p>Define e estrutura os ângulos da face (como mandíbula e maçãs do rosto) para um efeito lifting sutil e natural. Restaura a sustentação da pele e realça a beleza do seu perfil.</p></div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header" onClick={handleAccordionClick}>
                    <h3>Rinomodelação</h3><span className="icon">+</span>
                </div>
                <div className="accordion-content"><p>Harmonização não cirúrgica do perfil nasal. Com aplicações precisas de ácido hialurônico, corrigimos pequenas assimetrias e empinamos a ponta do nariz, com resultados imediatos.</p></div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" onClick={handleAccordionClick}>
                <h3>Bioestimulador de Colágeno</h3><span className="icon">+</span>
              </div>
              <div className="accordion-content"><p>O tratamento definitivo para a flacidez e a perda de firmeza da pele. Os bioestimuladores são substâncias que incentivam o seu próprio corpo a produzir novas fibras de colágeno, restaurando a estrutura, a espessura e a qualidade da pele de forma gradual e duradoura. O resultado é um rejuvenescimento profundo e natural.</p></div>
            </div>
            <div className="accordion-item">
              <div className="accordion-header" onClick={handleAccordionClick}>
                <h3>Fios de PDO — Lifting e Sustentação</h3><span className="icon">+</span>
              </div>
              <div className="accordion-content"><p>Uma técnica inovadora para promover um efeito lifting não cirúrgico e estimular a produção natural de colágeno. Os fios de PDO são absorvíveis pelo organismo e criam uma rede de sustentação para a pele, tratando a flacidez e redefinindo os contornos da face com elegância e discrição.</p></div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="content-section">
            <h2 className="section-title">Resultados que Falam por Si</h2>
            <p className="section-text">Cada rosto conta uma história. Aqui, você confere o foco do meu trabalho: realçar a beleza individual com naturalidade e elegância através de cada procedimento.</p>
            
            <div className="results-card-grid">
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28"><path d="M470.1,253.5c-3-3.1-6.4-5.7-10.1-7.9c-3.7-2.2-7.8-3.4-12.1-3.4H64c-8.8,0-16,7.2-16,16s7.2,16,16,16h384c4.3,0,8.4-1.2,12.1-3.4c3.7-2.2,7.1-4.8,10.1-7.9c3-3.1,5.5-6.8,7.4-11c1.9-4.2,2.6-8.8,2-13.5C474.3,258.9,472.5,255.9,470.1,253.5z M64,224h384c4.3,0,8.4-1.2,12.1-3.4c3.7-2.2,7.1-4.8,10.1-7.9c3-3.1,5.5-6.8,7.4-11c1.9-4.2,2.6-8.8,2-13.5c-1.8-11.8-10.3-21.2-22.1-23.4c-3-0.6-6-0.9-9-0.9H64c-8.8,0-16,7.2-16,16s7.2,16,16,16z"/></svg>
                    </div>
                    <h3>Preenchimento Labial Natural</h3>
                    <p>Resultados sutis e proporcionais — ênfase em contorno e hidratação para um aspecto jovem e natural.</p>
                </div>
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" width="28" height="28"><path d="M192 0C86 0 0 86 0 192C0 345.5 192 512 192 512s192-166.5 192-320C384 86 298 0 192 0zM192 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    </div>
                    <h3>Rinomodelação</h3>
                    <p>Ajustes não cirúrgicos para harmonia do perfil com resultados imediatos e naturais.</p>
                </div>
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width="28" height="28"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 157.1 0 212.4 0 288c0 70.7 49.4 128 112 128h352c62.6 0 112-57.3 112-128c0-75.6-48.6-130.9-95.4-175.4C433.5 68.8 368.8 32 288 32z"/></svg>
                    </div>
                    <h3>Preenchimento de Olheiras</h3>
                    <p>Técnica personalizada para suavizar sombras e devolver um aspecto descansado ao olhar.</p>
                </div>
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                    <h3>Preenchimento de Contorno</h3>
                    <p>Estratégias para realçar os ângulos da mandíbula e malar (maçãs do rosto) com naturalidade.</p>
                </div>
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20L158.7 288H96c-8.8 0-16-7.2-16-16s7.2-16 16-16h79.3c3.1 0 6.1 1.1 8.5 3.1l80 64c6.9 5.6 7.8 15.9 2.2 22.8s-15.9 7.8-22.8 2.2L208 328.8V416c0 8.8-7.2 16-16 16s-16-7.2-16-16V372.4L159.3 388.7zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM160 160a32 32 0 1 1-64 0 32 32 0 1 1 64 0zM384 224a32 32 0 1 1-64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>
                    </div>
                    <h3>Bioestimulador de Colágeno</h3>
                    <p>Restaura a estrutura e a firmeza da pele de forma gradual, incentivando seu corpo a produzir colágeno.</p>
                </div>
                <div className="result-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="28" height="28"><path d="M132.3 228.3L256 104.6l123.7 123.7c3.1 3.1 7.2 4.7 11.3 4.7s8.2-1.6 11.3-4.7c6.2-6.2 6.2-16.4 0-22.6L278.6 81.4c-6.2-6.2-16.4-6.2-22.6 0L132.3 205.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0zM278.6 430.6L132.3 284.3c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L256 429.4l123.7-123.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L278.6 408c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7z"/></svg>
                    </div>
                    <h3>Fios de PDO — Lifting e Sustentação</h3>
                    <p>Promove um efeito lifting não cirúrgico, tratando a flacidez e redefinindo os contornos da face.</p>
                </div>
            </div>

            <p className="portfolio-cta">
                Para ver exemplos de procedimentos realizados e resultados recentes, peça o portfólio por contato direto.
            </p>
        </section>

        <section id="testimonials" className="content-section alt-bg">
            <h2 className="section-title">Depoimentos</h2>
            <div className="testimonials-container">
                <div className="testimonial-card"><p>"Atendimento cuidadoso e resultado natural — me senti segura em todo o processo. Recomendo!"</p><span>- Mariana S.</span></div>
                <div className="testimonial-card"><p>"Profissional dedicada, explicou cada etapa e o resultado ficou exatamente como eu queria."</p><span>- Camila R.</span></div>
                <div className="testimonial-card"><p>"Sempre quis fazer preenchimento labial, mas tinha pavor de ficar artificial. A Dra. Klei entendeu exatamente o que eu buscava: só um toque de volume. Ficou delicado e super natural. Amei!"</p><span>- Gabriela F.</span></div>
                <div className="testimonial-card"><p>"O que mais me incomodava era o aspecto de cansaço das olheiras. A técnica da Dra. Klei foi incrível, mal senti. O resultado me deixou com uma aparência muito mais descansada."</p><span>- Lucas M.</span></div>
            </div>
        </section>

        <section id="experience" className="content-section">
            <h2 className="section-title">Segurança e Excelência em Cada Detalhe</h2>
            <ul className="experience-list">
                <li><strong>Graduação Superior em Biomedicina:</strong> Base científica sólida para a compreensão aprofundada da pele e da anatomia facial.</li>
                <li><strong>Pós-Graduação em Estética Avançada:</strong> Foco em protocolos de Harmonização Facial e técnicas avançadas de injetáveis.</li>
                <li><strong>Prática Clínica Exclusiva:</strong> Atendimento dedicado e individualizado em Erechim, RS, com foco total na sua segurança e satisfação.</li>
            </ul>
        </section>
        
        <section id="contact" className="content-section contact-section">
            <h2 className="section-title">Vamos começar a sua jornada de beleza?</h2>
            <p className="section-text">O primeiro passo é uma conversa. Agende sua avaliação para criarmos um plano exclusivo para você.</p>
            <form id="contact-form" className="contact-form" noValidate onSubmit={handleFormSubmit}>
                 <div className="form-group"><label htmlFor="name">Seu nome completo</label><input type="text" id="name" name="name" placeholder="Digite seu nome completo" required />
                    <span className="error-message">Este campo é obrigatório</span></div>
                 <div className="form-group"><label htmlFor="email">Seu e-mail</label><input type="email" id="email" name="email" placeholder="seu.email@exemplo.com" required />
                    <span className="error-message">Por favor, insira um e-mail válido</span></div>
                 <div className="form-group"><label htmlFor="phone">Seu telefone/WhatsApp</label><input type="tel" id="phone" name="phone" placeholder="(XX) XXXXX-XXXX" required />
                    <span className="error-message">Este campo é obrigatório</span></div>
                <div className="form-group"><label htmlFor="service">Serviço desejado</label><select id="service" name="service" required><option value="">Selecione o serviço desejado</option><option value="Avaliação Facial">Avaliação Facial</option><option value="Preenchimento Labial">Preenchimento Labial</option><option value="Preenchimento de Olheiras">Preenchimento de Olheiras</option><option value="Contorno Facial">Contorno Facial</option><option value="Rinomodelação">Rinomodelação</option><option value="Toxina Botulínica (Botox)">Toxina Botulínica (Botox)</option><option value="Outro assunto">Outro assunto</option></select>
                     <span className="error-message">Por favor, selecione um serviço</span></div>
                 <div className="form-group"><label htmlFor="case-description">Descreva brevemente seu caso</label><textarea id="case-description" name="case-description" rows={4} placeholder="Conte-me um pouco sobre o que você busca..."></textarea></div>
                <div className="form-group"><button type="submit" className="btn btn-primary btn-full">Enviar via WhatsApp</button></div>
            </form>
            <div className="contact-info">
                <p><strong>E-mail:</strong> kleyy_p@hotmail.com | <strong>Telefone / WhatsApp:</strong> +55 54 99970-3803</p>
                <p><strong>Instagram:</strong> <a href="https://www.instagram.com/drakleiprior" target="_blank" rel="noopener noreferrer">@drakleiprior</a> | <strong>Endereço:</strong> Atendimento em Erechim, RS</p>
            </div>
        </section>
      </main>

      <footer className="main-footer">
          <p>© 2025 Dra. Klei Prior - Biomédica Esteta. Todos os direitos reservados.</p>
      </footer>
      
      <a href="https://wa.me/5554999703803" className="floating-whatsapp-btn" id="whatsapp-float-btn" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="28" height="28">
            <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.5-97.2-24.6l-7-4.1-72.5 19.1 19.4-70.5-4.5-7.3c-18.4-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>
    </>
  );
}