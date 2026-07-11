{
  description = "Codefun Debug environment";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-parts.url = "github:hercules-ci/flake-parts";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;

      imports = [
        inputs.process-compose-flake.flakeModule
      ];

      perSystem =
        {
          self',
          pkgs,
          system,
          config,
          ...
        }:
        {
          _module.args.pkgs = import inputs.nixpkgs {
            inherit system;
            config = {
              allowUnfree = true;
              permittedInsecurePackages = [
                "nodejs-20.20.2"
                "nodejs-slim-20.20.2"
              ];
            };
          };

          process-compose."dev" = {
            imports = [
              inputs.services-flake.processComposeModules.default
            ];

            services.postgres."pg" = {
              enable = true;
              superuser = "chise";
              createDatabase = false;
              initialScript.before = ''
                CREATE DATABASE chise OWNER chise;
                CREATE USER suzume WITH PASSWORD 'password' CREATEDB;
                \c chise
                GRANT CREATE ON DATABASE chise TO suzume;
                GRANT CREATE ON SCHEMA public to suzume;
              '';
            };
          };

          devShells.default = pkgs.mkShell {

            inputsFrom = [
              config.process-compose."dev".services.outputs.devShell
            ];
            packages = with pkgs; [
              nodejs_20
              pnpm_10
              openssl.dev
            ];
            buildInputs = with pkgs; [
              prisma-engines_6
              prisma
            ];
            shellHook = ''
              export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig";
              export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/schema-engine"
              export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/query-engine"
              export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines_6}/lib/libquery_engine.node"
              export PRISMA_FMT_BINARY="${pkgs.prisma-engines_6}/bin/prisma-fmt"
            '';
          };
        };

    };
}
