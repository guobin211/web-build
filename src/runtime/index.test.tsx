import { defineConfig, getConfig } from './index';

test('defineConfig and getConfig', () => {
  defineConfig('version', '16');
  const version = getConfig('version');
  expect(version).toBe('16');
  expect(getConfig('package')).toBe(undefined);
  expect(getConfig('NODE_ENV')).toBe('test');
});
