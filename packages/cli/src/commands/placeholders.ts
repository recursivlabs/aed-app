import { log } from '../lib/output.js';

/**
 * Commands we've reserved as the AED Connect Cloud surface but haven't
 * implemented yet. They print a clear "coming soon" so the brand
 * surface is real but expectations are honest.
 */

export async function initCommand(): Promise<void> {
  log.info("'minds init' will scaffold a new AED Connect Cloud network.");
  log.dim('  Coming soon. Until then, see https://minds.com/cloud for early access.');
}

export async function deployCommand(): Promise<void> {
  log.info("'minds deploy' will deploy a AED Connect Cloud tenant.");
  log.dim('  Coming soon. For platform-level deploys today, see @recursiv/cli (recursiv deploy).');
}

export async function tenantCommand(): Promise<void> {
  log.info("'minds tenant' will manage AED Connect Cloud tenants (create, list, settings).");
  log.dim('  Coming soon.');
}
