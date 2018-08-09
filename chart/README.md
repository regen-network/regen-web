# GitLab's Auto-deploy Helm Chart (Modified)

Initially cloned from https://gitlab.com/charts/auto-deploy-app

Upgraded with:
* Postgis docker image
* [Helm hook](https://docs.helm.sh/developing_charts/#hooks) to run [Flyway](https://flywaydb.org) migration [job](templates/flyway-migrate-job.yaml)
