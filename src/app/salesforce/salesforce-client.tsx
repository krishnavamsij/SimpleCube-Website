'use client'

import { useEffect } from 'react'
import styles from './page.module.css'

export default function SalesforceClient() {
  useEffect(() => {
    // Initialize carousel functionality
    const initCarousel = () => {
      const carouselElement = document.querySelector('.photobox-carousel.kd-pbc-69f2e0c26ecaf .pbc-content') as HTMLElement
      if (carouselElement) {
        // Simple carousel implementation
        let currentIndex = 0
        const items = carouselElement.querySelectorAll('.kd-photobox') as NodeListOf<HTMLElement>
        const totalItems = items.length
        
        if (totalItems > 0) {
          // Show first 3 items initially
          items.forEach((item, index) => {
            if (index < 3) {
              item.style.display = 'block'
            } else {
              item.style.display = 'none'
            }
          })
          
          // Add navigation buttons if needed
          const prevButton = document.createElement('button')
          prevButton.className = 'carousel-prev'
          prevButton.innerHTML = '‹'
          prevButton.style.cssText = `
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: #345195;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
          `
          
          const nextButton = document.createElement('button')
          nextButton.className = 'carousel-next'
          nextButton.innerHTML = '›'
          nextButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: #345195;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
          `
          
          if (carouselElement.parentElement) {
            carouselElement.parentElement.style.position = 'relative'
            carouselElement.parentElement.appendChild(prevButton)
            carouselElement.parentElement.appendChild(nextButton)
          }
          
          prevButton.addEventListener('click', () => {
            items.forEach(item => item.style.display = 'none')
            currentIndex = (currentIndex - 3 + totalItems) % totalItems
            for (let i = 0; i < 3; i++) {
              const index = (currentIndex + i) % totalItems
              items[index].style.display = 'block'
            }
          })
          
          nextButton.addEventListener('click', () => {
            items.forEach(item => item.style.display = 'none')
            currentIndex = (currentIndex + 3) % totalItems
            for (let i = 0; i < 3; i++) {
              const index = (currentIndex + i) % totalItems
              items[index].style.display = 'block'
            }
          })
        }
      }
    }
    
    // Initialize animations
    const initAnimations = () => {
      const animatedElements = document.querySelectorAll('.kd-animated') as NodeListOf<HTMLElement>
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.classList.add('animated')
          }
        })
      }, { threshold: 0.1 })
      
      animatedElements.forEach(element => {
        observer.observe(element)
      })
    }
    
    // Initialize after DOM is ready
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        initCarousel()
        initAnimations()
      }, 100)
    }
  }, [])

  return (
    <div className={styles.salesforcePage}>
      {/* Header Section */}
      <section className={`${styles.vcSection} ${styles.vcSectionHasNoGap}`}>
        <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcRowFluid} ${styles.vcRowOContentMiddle} ${styles.vcRowFlex}`}>
          <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm12}`}>
            <div className={styles.vcColumnInner}>
              <div className={styles.wpbWrapper}>
                <header className={`${styles.kdSectionTitle} ${styles.textCenter} ${styles.kdAnimated} ${styles.fadeIn}`}>
                  <h2 className={styles.separatorOff} style={{ color: '#ffffff' }}>Transform Your Business with Hyniva Salesforce Accelerator Solutions</h2>
                  <h5 style={{ color: '#ffffff' }}>Empower your business transformation with Hyniva's Salesforce expertise in CRM, automated workflows, mobile integration, and analytics for maximum ROI.</h5>
                </header>
                <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcInner} ${styles.vcRowFluid} ${styles.vcRowOContentMiddle} ${styles.vcRowFlex}`}>
                  <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm12}`}>
                    <div className={styles.vcColumnInner}>
                      <div className={styles.wpbWrapper}>
                        <div className={`${styles.wpbTextColumn} ${styles.wpbContentElement} ${styles.wpbAnimateWhenAlmostVisible} ${styles.wpbFadeInUp} ${styles.fadeInUp}`}>
                          <div className={styles.wpbWrapper}>
                            <p style={{ textAlign: 'center' }}>
                              <a className={`${styles.ttButton} ${styles.ttPrimaryButton} ${styles.btnPrimaryColor} ${styles.kdAnimated} ${styles.zoomIn} ${styles.kdAnimate}`} title="" href="mailto:connect@hyniva.com" target="_self" rel="noopener" data-animation-delay="200">
                                <span className={styles.primText}>Let's Go!</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={`${styles.vcSection} ${styles.vcSectionHasNoGap}`}>
        <div className={styles.container}>
          <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcRowFluid}`}>
            <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm12}`}>
              <div className={styles.vcColumnInner}>
                <div className={styles.wpbWrapper}>
                  <div className={`${styles.wpbTextColumn} ${styles.wpbContentElement}`}>
                    <div className={styles.wpbWrapper}>
                      <h2>Salesforce Customer 360 Innovations for our clients</h2>
                      <p>In an increasingly competitive market, businesses are constantly seeking ways to deepen their understanding of customers and enhance engagement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photobox Carousel Section */}
      <section className={`${styles.vcSection} ${styles.vcSectionHasNoGap}`}>
        <div className={styles.container}>
          <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcRowFluid}`}>
            <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm12}`}>
              <div className={styles.vcColumnInner}>
                <div className={styles.wpbWrapper}>
                  <div className={`${styles.kdPhotoboxCarousel} ${styles.photoboxCarousel} ${styles.kdPbc69f2e0c26ecaf}`}>
                    <div className={styles.pbcContent}>
                      {/* Photobox Items */}
                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://hyniva.com/overcoming-business-challenges-with-salesforce/" title="Overcoming Obstacles with Salesforce">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1280" height="720" src="https://products.hyniva.com/wp-content/uploads/2024/09/Salesforce.png" className="attachment-full" alt="Top Business Challenges" title="Salesforce" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Overcoming Obstacles with Salesforce</h5>
                            <p><b>Article</b></p>
                            <p>In today's fast-paced market, organizations face numerous challenges that can hinder growth and efficiency. Learn how Salesforce can be leveraged to overcome these obstacles to maximize ROI.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/scaling-service-operations-with-salesforce/" title="Scaling Service Operations with Salesforce: Faster, Smarter, Proactive">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="757" height="589" src="https://products.hyniva.com/wp-content/uploads/2025/09/Salesforce-VCM.png" className="attachment-full" alt="" title="Salesforce VCM" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Salesforce Advantage</h5>
                            <p><b>Case Study</b></p>
                            <p>Hyniva reimagined customer support with Salesforce — unifying data, automating workflows, and enabling proactive care for faster resolutions and happier customers.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/modernizing-contact-center-with-ivr-self-service/" title="Modernizing Contact Center with IVR Self-Service">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="2560" height="1707" src="https://products.hyniva.com/wp-content/uploads/2026/02/Modernizing-IVR-for-CC-scaled.jpg" className="attachment-full" alt="" title="Indian Woman at Call Center Providing Customer Service" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>IVR Modernization</h5>
                            <p><b>Case Study</b></p>
                            <p>Hyniva modernized a wealth management firm's IVR self-service platform, simplifying call routing, improving security, and reducing call handling time.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/accelerating-platform-performance-through-lwr-modernization/" title="Accelerating Platform Performance Through LWR Modernization">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1184" height="864" src="https://products.hyniva.com/wp-content/uploads/2026/02/Lwr-modernization.png" className="attachment-full" alt="" title="Lwr modernization" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>LWR Modernization</h5>
                            <p><b>Case Study</b></p>
                            <p>Hyniva modernized a credit union's Experience Cloud platform by migrating from Aura to LWR, improving speed, scalability and digital experience delivery.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/member-experience-transformation-at-a-leading-credit-union/" title="Member Experience Transformation at a Leading Credit Union">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1184" height="665" src="https://products.hyniva.com/wp-content/uploads/2026/02/Credit-Union-CX-e1771481017710.png" className="attachment-full" alt="" title="Credit Union CX" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Credit Union CX</h5>
                            <p><b>Case Study</b></p>
                            <p>Lending transformed with FinXForce, unifying digital channels &amp; reducing loan offer times to under 60 seconds—boosting ROI, engagement, &amp; member satisfaction.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/modernizing-the-contact-center-with-ai-agents-from-fragmented-interactions-to-connected-journeys/" title="Modernizing the Contact Center with Agentforce: From Fragmented Interactions to Connected Journeys">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1184" height="864" src="https://products.hyniva.com/wp-content/uploads/2026/01/Firefly_Gemini-Flash_A-hyper-realistic-emotionally-positive-image-of-a-customer-completing-a-customer-ser-792046.png" className="attachment-full" alt="" title="Firefly_Gemini Flash_A hyper-realistic, emotionally positive image of a customer completing a customer ser 792046" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Contact Center Modernization with Agentforce</h5>
                            <p><b>Article</b></p>
                            <p>Salesforce Agentforce connects fragmented contact center journeys by supporting customers, MSRs, and operations end to end—reducing wait times, manual effort, and resolution delays.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/accelerating-platform-performance-through-lwr-modernization/" title="Accelerating Platform Performance Through LWR Modernization">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1184" height="864" src="https://products.hyniva.com/wp-content/uploads/2026/02/Lwr-modernization.png" className="attachment-full" alt="" title="Lwr modernization" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Experience Cloud Modernization with LWR</h5>
                            <p><b>Article</b></p>
                            <p>Financial institutions are adopting LWR to improve performance, scalability, and digital experience delivery on Salesforce Experience Cloud.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/agentforce-powered-document-intelligence-for-instant-loan-processing/" title="Agentforce-Powered Document Intelligence for Instant Loan Processing">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="2000" height="1333" src="https://products.hyniva.com/wp-content/uploads/2026/02/Agentforce-Powered-Document-Intelligence-for-Instant-Loan-Processing.jpg" className="attachment-full" alt="" title="Agentforce-Powered Document Intelligence for Instant Loan Processing" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>AI Loan Processing</h5>
                            <p><b>Case Study</b></p>
                            <p>Hyniva embedded Agentforce-powered document intelligence into FinXServe to automate verification and enable near-instant digital loan approvals.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/leveraging-salesforce-for-advanced-analytics-insights-into-sales-and-customer-behavior/" title="Leveraging Salesforce for Advanced Analytics: Insights into Sales and Customer Behavior">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="800" height="800" src="https://products.hyniva.com/wp-content/uploads/2025/02/2.png" className="attachment-full" alt="Harnessing Salesforce for Data Insights" title="Harnessing Salesforce for Data Insights" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Leveraging Salesforce for Advanced Analytics: Insights into Sales and Customer Behavior</h5>
                            <p><b>Article</b></p>
                            <p>In today's fast-paced business environment, companies must continually evolve to meet customer demands and outperform competitors.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/salesforce-for-marketing-integrating-salesforce-with-your-marketing-strategy/" title="Salesforce for Marketing: Integrating Salesforce with Your Marketing Strategy">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1600" height="1080" src="https://products.hyniva.com/wp-content/uploads/2025/01/Salesforce-for-Marketing.png" className="attachment-full" alt="Salesforce for Marketing" title="Salesforce for Marketing" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Salesforce for Marketing: Integrating Salesforce with Your Marketing Strategy</h5>
                            <p><b>Article</b></p>
                            <p>Integrating Salesforce with your marketing platforms and strategies is essential for creating a seamless, unified customer experience across sales and marketing channels.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/salesforce-lightning-vs-classic-why-you-should-switch/" title="Salesforce Lightning vs. Classic: Why You Should Switch">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1080" height="1080" src="https://products.hyniva.com/wp-content/uploads/2025/01/Salesforce-Classic-and-Lighting.png" className="attachment-full" alt="Salesforce Classic and Lighting" title="Salesforce Classic and Lighting" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Salesforce Lightning vs. Classic: Why You Should Switch</h5>
                            <p><b>Article</b></p>
                            <p>Salesforce is one of the most powerful customer relationship management (CRM) tools available today, helping businesses streamline their processes, enhance productivity, and make data-driven decisions.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/overcoming-data-integration-challenges-with-salesforce-data-cloud/" title="Overcoming Data Integration Challenges with Salesforce Data Cloud">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="800" height="800" src="https://products.hyniva.com/wp-content/uploads/2025/01/Salesforce-Data-Cloud.png" className="attachment-full" alt="Overcoming Data Integration Challenges with Salesforce Data Cloud" title="Salesforce Data Cloud" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Overcoming Data Integration Challenges with Salesforce Data Cloud</h5>
                            <p><b>Article</b></p>
                            <p>In the digital age, data is the backbone of business success. Companies today are generating vast amounts of data from various sources—CRM systems, social media, IoT devices, and more.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/unlock-the-future-of-crm-with-the-latest-salesforce-innovations/" title="Unlock the Future of CRM with the Latest Salesforce Innovations">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1080" height="1080" src="https://products.hyniva.com/wp-content/uploads/2024/12/Unlock-the-future-of-CRM.png" className="attachment-full" alt="Unlock the future of CRM with the latest Salesforce Innovations" title="Unlock the future of CRM" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Unlock the Future of CRM with the Latest Salesforce Innovations</h5>
                            <p><b>Article</b></p>
                            <p>In the fast-paced digital age, Customer Relationship Management (CRM) is not just about tracking interactions—it's about harnessing data, leveraging artificial intelligence (AI), and delivering personalized experiences at scale.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/optimizing-salesforce-fsc-future-proofing-your-financial-institution-with-hynivas-expertise/" title="Start Your Salesforce FSC Optimization Journey">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1080" height="1080" src="https://products.hyniva.com/wp-content/uploads/2024/12/Salesforce.png" className="attachment-full" alt="Start Your Salesforce FSC Optimization Journey" title="Salesforce" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Start Your Salesforce FSC Optimization Journey</h5>
                            <p><b>Article</b></p>
                            <p>In the rapidly evolving financial landscape, institutions need more than just a CRM system; they need a powerful, adaptable platform that can manage customer relationships, streamline operations, and enable seamless integration across their services.</p>
                          </div>
                        </a>
                      </div>

                      <div className={styles.kdPhotobox}>
                        <a className={styles.fullPboxLink} href="https://www.hyniva.com/engineering-secure-authentication-through-pindrop-integration/" title="Engineering Secure Authentication Through Pindrop Integration">
                          <div className={styles.photoboxImg}>
                            <img loading="lazy" decoding="async" width="1184" height="864" src="https://products.hyniva.com/wp-content/uploads/2026/02/Pindrop-Integration.png" className="attachment-full" alt="" title="Pindrop Integration" />
                          </div>
                          <div className={`${styles.phbContent} ${styles.textLeft}`}>
                            <h5>Voice Authentication</h5>
                            <p><b>Case Study</b></p>
                            <p>Hyniva integrated Pindrop into the contact center to enable passive, multi-factor voice authentication, reducing handle time while strengthening fraud protection.</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`${styles.vcSection} ${styles.vcRowHasFill} ${styles.vcRowHasPaddingTop} ${styles.vcRowHasPaddingBottom}`} style={{ backgroundImage: 'url("https://products.hyniva.com/wp-content/uploads/2024/09/nature-landscape-background-1-scaled-e1726749512428.jpg")' }}>
        <div className={styles.container}>
          <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcRowFluid}`}>
            <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm12}`}>
              <div className={styles.vcColumnInner}>
                <div className={styles.wpbWrapper}>
                  <header className={`${styles.kdSectionTitle} ${styles.vcColLg6} ${styles.vcColSm8} ${styles.textCenter} ${styles.kdAnimated} ${styles.fadeIn}`}>
                    <h3 className={styles.separatorOff} style={{ color: '#ffffff' }}>Ready to get started?<br />Contact us!</h3>
                  </header>
                  <div className={`${styles.vcRow} ${styles.wpbRow} ${styles.vcInner} ${styles.vcRowFluid}`}>
                    <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm3}`}>
                      <div className={styles.vcColumnInner}>
                        <div className={styles.wpbWrapper}></div>
                      </div>
                    </div>
                    <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm6}`}>
                      <div className={styles.vcColumnInner}>
                        <div className={styles.wpbWrapper}>
                          <div className={`${styles.wpbTextColumn} ${styles.wpbContentElement} ${styles.wpbAnimateWhenAlmostVisible} ${styles.wpbFadeInUp} ${styles.fadeInUp}`}>
                            <div className={styles.wpbWrapper}>
                              <p style={{ textAlign: 'center' }}>
                                <a className={`${styles.ttButton} ${styles.ttPrimaryButton} ${styles.btnPrimaryColor} ${styles.kdAnimated} ${styles.zoomIn} ${styles.kdAnimate}`} title="" href="mailto:connect@hyniva.com" target="_self" rel="noopener" data-animation-delay="200">
                                  <span className={styles.primText}>Let's Go!</span>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.wpbColumn} ${styles.vcColumnContainer} ${styles.vcColSm3}`}>
                      <div className={styles.vcColumnInner}>
                        <div className={styles.wpbWrapper}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
