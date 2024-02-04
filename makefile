install:
	bin/composer install

start:
	php -S localhost:8080

test:
	# cd tst && ../vendor/bin/phpunit
	./vendor/bin/phpunit tst

.PHONY: install start test lint

lint:
	php -l ./lib/*.php
	./vendor/bin/phpcs --extensions=php ./lib/
	./vendor/bin/phpmd ./lib ansi codesize,unusedcode,naming
	# ./vendor/bin/php-cs-fixer fix --dry-run --diff
