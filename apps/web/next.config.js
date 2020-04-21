const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['@shared/store']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // any configs you need
};

module.exports = withPlugins(
  [withTM, withBundleAnalyzer, withImages],
  nextConfig,
);
