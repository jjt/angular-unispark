module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'coffee',
            src: ['**/*.coffee'],
            dest: '',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      coffee: {
        files: ['coffee/**/*.coffee'],
        tasks: ['coffee']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  
  return grunt.registerTask('default', ['watch']);

}

