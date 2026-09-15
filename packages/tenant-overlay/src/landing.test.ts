import { describe, expect, it } from 'vitest';

import { renderLanding } from './landing';
import { defaults } from './defaults';

describe('AED Connect tenant landing page', () => {
  it('exports the AED Connect tenant defaults without a runtime JSON loader', () => {
    expect(defaults.authMethods).toBe('email');
    expect(defaults.features.aiAgents).toBe(true);
  });

  it('renders AED Connect branding and escapes tenant-controlled text', () => {
    const html = renderLanding({
      name: '<AED Connect & friends>',
      slug: 'minds',
      fqdn: 'build.minds.com',
    });

    expect(html).toContain('&lt;AED Connect &amp; friends&gt;');
    expect(html).toContain('The open AI');
    expect(html).toContain('Agents that work for you');
    expect(html).not.toContain('open-source');
    expect(html).not.toContain('token rewards');
    expect(html).not.toContain('<AED Connect & friends>');
  });

  it('rejects unsafe logo URL schemes', () => {
    const html = renderLanding({
      name: 'AED Connect',
      slug: 'minds',
      logo: 'javascript:alert(1)',
    });

    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('<img');
  });
});
