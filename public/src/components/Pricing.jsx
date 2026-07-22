import React, { useState, useEffect } from 'react';
import { Check, HelpCircle, Calculator } from 'lucide-react';

export default function Pricing({ onSelectPackage }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  // Standard plan prices in INR
  const plans = [
    {
      name: 'Launchpad',
      priceMonthly: 5999,
      priceYearly: 4799,
      desc: 'Perfect for landing pages, portfolio sites, and local business showcases.',
      features: [
        'Up to 5 static pages',
        'Mobile-first responsive design',
        'Basic contact form integration',
        'Standard SEO configuration',
        '1 Month maintenance support',
      ],
      tag: 'Basic'
    },
    {
      name: 'Ascent',
      priceMonthly: 14999,
      priceYearly: 11999,
      desc: 'Ideal for growing startups, interactive business applications, and catalog websites.',
      features: [
        'Up to 15 dynamic pages',
        'Custom admin dashboard / CMS',
        'Advanced CSS styling & animations',
        'Database & authentication support',
        'API endpoint integrations',
        '3 Months priority support',
      ],
      tag: 'Growth',
      popular: true
    },
    {
      name: 'Infinity',
      priceMonthly: 39999,
      priceYearly: 31999,
      desc: 'Tailored for complete web systems, software-as-a-service (SaaS), and custom platforms.',
      features: [
        'Unlimited scale (custom pages)',
        'Bespoke design language & branding',
        'Robust multi-user admin panels',
        'Complete serverless/Express API backend',
        'Payment gateway integration',
        '1 Year dedicated SLA support',
      ],
      tag: 'Enterprise'
    }
  ];

  // Interactive Calculator State
  const [pages, setPages] = useState(5);
  const [hasDatabase, setHasDatabase] = useState(false);
  const [hasEcommerce, setHasEcommerce] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);
  const [hasSeo, setHasSeo] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Calculate customized quote
  useEffect(() => {
    let base = 5000; // Base cost for single-page boilerplate
    const costPerPage = 800; // ₹800 per page
    
    let total = base + (pages * costPerPage);
    
    if (hasDatabase) total += 12000; // Database addon cost
    if (hasEcommerce) total += 15000; // E-commerce addon cost
    if (hasAuth) total += 8000; // User Auth addon cost
    if (hasSeo) total += 5000; // Speed & SEO tuning addon cost

    setEstimatedCost(total);
  }, [pages, hasDatabase, hasEcommerce, hasAuth, hasSeo]);

  const handleApplyCustomQuote = () => {
    const customSummary = `Custom Website Package: ${pages} pages, Addons:[${hasDatabase ? 'Database, ' : ''}${hasEcommerce ? 'E-commerce, ' : ''}${hasAuth ? 'Auth/Security, ' : ''}${hasSeo ? 'SEO/Performance' : ''}] (Est: ₹${estimatedCost.toLocaleString('en-IN')})`;
    onSelectPackage({
      planName: 'Custom Quote',
      price: estimatedCost,
      details: customSummary
    });
  };

  const handleSelectPlan = (plan) => {
    const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    onSelectPackage({
      planName: `${plan.name} (${billingCycle === 'monthly' ? 'Monthly' : 'Annual'/* billed yearly */})`,
      price: price,
      details: `Standard tier with ${plan.features[0]}`
    });
  };

  return (
    <section id="pricing" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Flexible <span className="gradient-accent-text">Pricing Plans</span>
        </h2>
        <p className="section-subtitle">
          Choose a pre-configured service tier or compute a custom quote that aligns with your specific requirements.
        </p>
      </div>

      {/* Monthly/Annual Toggle */}
      <div className="pricing-controls reveal">
        <span className={`toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly</span>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={billingCycle === 'yearly'} 
            onChange={(e) => setBillingCycle(e.target.checked ? 'yearly' : 'monthly')}
            aria-label="Billing cycle toggle"
          />
          <span className="toggle-slider"></span>
        </label>
        <span className={`toggle-label ${billingCycle === 'yearly' ? 'active' : ''}`}>
          Annually <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginLeft: '4px' }}>(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {plans.map((plan, index) => {
          const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
          return (
            <div 
              key={index} 
              className={`pricing-card glass reveal ${plan.popular ? 'popular' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price-box">
                <span className="plan-price">₹{price.toLocaleString('en-IN')}</span>
                <span className="plan-period">/{billingCycle === 'monthly' ? 'mo' : 'mo'}</span>
                {billingCycle === 'yearly' && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '4px' }}>
                    Billed annually
                  </div>
                )}
              </div>
              <p className="plan-desc">{plan.desc}</p>
              
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="plan-feature-item">
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ marginTop: 'auto' }}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pricing Calculator */}
      <div className="pricing-calculator-box glass reveal">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Calculator size={28} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.5rem' }}>Interactive Cost Estimator</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '30px' }}>
          Estimate your digital development costs in real-time. Fine-tune pages and toggle features to compute a tailored quote.
        </p>

        <div className="calculator-grid">
          <div className="calculator-controls">
            {/* Range Slider for Pages */}
            <div className="calc-control-group">
              <div className="calc-label-box">
                <span className="calc-label">Total Web Pages</span>
                <span className="calc-val">{pages} pages</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={pages} 
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="range-slider"
                aria-label="Web pages slider"
              />
            </div>

            {/* Checkboxes for addons */}
            <div className="calc-control-group">
              <span className="calc-label" style={{ marginBottom: '5px' }}>Feature Integrations</span>
              <div className="calc-options-grid">
                <label className={`calc-checkbox-card ${hasDatabase ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={hasDatabase} 
                    onChange={(e) => setHasDatabase(e.target.checked)} 
                  />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Database Integration</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+₹12,000</div>
                  </div>
                </label>

                <label className={`calc-checkbox-card ${hasEcommerce ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={hasEcommerce} 
                    onChange={(e) => setHasEcommerce(e.target.checked)} 
                  />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>E-commerce Portal</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+₹15,000</div>
                  </div>
                </label>

                <label className={`calc-checkbox-card ${hasAuth ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={hasAuth} 
                    onChange={(e) => setHasAuth(e.target.checked)} 
                  />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Auth & Security shield</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+₹8,000</div>
                  </div>
                </label>

                <label className={`calc-checkbox-card ${hasSeo ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={hasSeo} 
                    onChange={(e) => setHasSeo(e.target.checked)} 
                  />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>SEO & Speed Pack</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+₹5,000</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="calculator-results">
            <span className="result-title">Estimated Cost</span>
            <span className="result-price">₹{estimatedCost.toLocaleString('en-IN')}</span>
            <span className="result-subtitle">Values are approximate development costs</span>
            <button 
              onClick={handleApplyCustomQuote}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Request This Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
