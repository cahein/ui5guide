module.exports = function (grunt) {
   "use strict";
   
   grunt.initConfig({
      package: grunt.file.readJSON("package.json"),
      dirs: grunt.file.readJSON("GruntRefs.json"),
      
      availabletasks: {
         tasks: {
            options: {
               groups: {
                  "Code quality": ["lint", "gendoc"],
                  "Build": ["dist"],
                  "Default": ["availabletasks"]
               },
               descriptions: {
                  "lint": "Run eslint for code analysis.",
                  "gendoc": "Generates html documentation.",
                  "dist": "Build distribution.",
                  "availabletasks": "List available tasks."
               },
               hideUngrouped: true
            }
         }
      },
      eslint: {
         options: {
            configFile: ".eslintrc.json"
         },
         target: [
            "<%= dirs.webroot %>/*.js",
            "<%= dirs.view %>/**/*.js",
            "<%= dirs.controller %>/**/*.js",
            "<%= dirs.fragment %>/**/*.js",
            "<%= dirs.lib %>/**/*.js",
            "<%= dirs.domainObject %>/*.js",
            "!<%= dirs.webroot %>/oui5lib.js",
            "!<%= dirs.oui5lib %>/**/*.js"
         ]
      },
      copy: {
         dist: {
            files: [
                {
                  src: [
                     "<%= dirs.webroot %>/index.html",
                     "<%= dirs.webroot %>/Component.js",
                     "<%= dirs.webroot %>/Router.js",
                     "<%= dirs.webroot %>/*.json",
                     "<%= dirs.webroot %>/oui5lib.js",
                     "<%= dirs.oui5lib %>/**",
                     "<%= dirs.i18n %>/i18n*.properties",
                     "<%= dirs.controller %>/**/*.js",
                     "<%= dirs.fragment %>/**/*.js",
                     "<%= dirs.fragment %>/**/*.xml",
                     "<%= dirs.view %>/**/*.js",
                     "<%= dirs.view %>/**/*.xml",
                     "<%= dirs.lib %>/**/*.js",
                     "<%= dirs.mapping %>/*.json",
                     "<%= dirs.domainObject %>/*.js",
                     "!<%= dirs.webroot %>/**/*~"
                  ],
                  dest: "<%= dirs.build %>/"
               }
            ]
         }
      },
      compress: {
         build: {
            options: {
               archive: "<%= dirs.dist %>/<%= package.name %>-webapp." +
                  "<%= grunt.template.today('yyyymmdd-HHMMss') %>.zip",
               mode: "zip"
            },
            files: [{
               expand: true,
               cwd: "<%= dirs.build %>/",
               src: [ "<%= dirs.webroot %>/**/*" ],
               dest: "/"
            }]
         }
      },
      clean: {
         build: {
            src: [
               "<%= dirs.build %>"
            ]
         },
         doc: {
            src: [
               "doc"
            ]
         }
      },
      jsdoc: {
         dist: {
            src: [
               "<%= dirs.webroot %>/*.js",
               "<%= dirs.lib %>/*.js",
               "<%= dirs.controller %>/**/*.js",
               "<%= dirs.fragment %>/**/*.js",
               "<%= dirs.domainObject %>/**/*.js"
            ],
            dest: "doc"
         }
      },
      openui5_preload: {
         component: {
            options: {
               resources: {
                  cwd: "<%= dirs.webroot %>",
                  prefix: "oum",
                  src: [
                     "Component.js",
                     "Router.js",
                     "controller/**",
                     "fragment/**",
                     "view/**",
                     "i18n/*.properties",
                     "lib/**",
                     "!**/*~"
                  ]
               },
               dest: "<%= dirs.build %>/webapp",
               compress: true
            },
            components: "oum"
         }
      }
   });
   grunt.loadNpmTasks("grunt-available-tasks");
   grunt.loadNpmTasks("grunt-contrib-clean");
   grunt.loadNpmTasks("grunt-contrib-copy");
   grunt.loadNpmTasks("grunt-contrib-compress");
   grunt.loadNpmTasks("grunt-jsdoc");
   grunt.loadNpmTasks("grunt-eslint");
   grunt.loadNpmTasks("grunt-openui5");

   grunt.registerTask("default", ["availabletasks"]);
   grunt.registerTask("lint", ["eslint"]);
   grunt.registerTask("gendoc", ["clean:doc", "jsdoc"]);
   grunt.registerTask("generatePreload", "openui5_preload");
   grunt.registerTask("dist", [
      "clean:build",
      "lint",
      "generatePreload",
      "copy:dist",
      "compress"
   ]);
};
