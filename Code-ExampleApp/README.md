The complete example application is assembled from several sources:

1. Get the 'oum' component from the [oui5lib](https://github.com/cahein/oui5lib) project.

2. Copy the [domain objects and mappings] (https://github.com/cahein/ui5guide/tree/edition_1/Code-DomainObjects/domainObjects) into the webapp folder.

3. Copy/overwrite all files from [01-Setup](https://github.com/cahein/ui5guide/tree/edition_1/Code-ExampleApp/01-Setup) to [07-OrderAddresses-save](https://github.com/cahein/ui5guide/tree/edition_1/Code-ExampleApp/07-OrderAddresses-save) into the webapp folder.

4. The [MockServer](https://github.com/cahein/ui5guide/tree/edition_1/Code-ExampleApp/MockServer) is a small [Ruby](https://www.ruby-lang.org/en/) application. Apart from Ruby, it also requires the 'sinatra' and 'logger' gems to be installed. Start the application with `ruby main.rb`. The default is to run on localhost port 3000. If you change the host and/or port, you also have to change the request configurations in [domainObjects/mapping](https://github.com/cahein/ui5guide/tree/edition_1/Code-DomainObjects/mapping).

As a convenience, the complete runnable code is available in the [webapp](https://github.com/cahein/ui5guide/tree/edition_1/Code-ExampleApp/webapp) folder.
