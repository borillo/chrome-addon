describe('MeetupScraper', function(){
  it('reads information of a future event in Valencia', function(done) {
    withFixture(meetupFixture, function(){
      var url = 'some url';
      var scrapper = new MeetupScraper({'url': url});
      var result = scrapper.scrap();

      assert.equal(result.success,true);
      assert.equal(result.event.title,'Title goes here');
      assert.equal(result.event.description,'Description goes here');
      assert.equal(result.event.datetime,'ISO Datetime goes here');
      assert.equal(result.event.url,'some url');
    }, done);
  });

  it('does not read the event if not in Valencia', function(done){
    withFixture(meetupFixture, function() {
      var changeLocality = function(){
        document.querySelector('span.locality').innerText = 'Alicante';
        document.querySelector('.event-where-address span:first-of-type').innerText = 'Alicante';
      }
      changeLocality();

      var scrapper = new MeetupScraper();
      var result = scrapper.scrap();

      assert.equal(result.success,false);
      assert.equal(result.event, undefined);
    }, done);
  });

  it('does not read the event if it does not have a date', function(done){
    withFixture(meetupFixture, function() {
      var removeDate = function(){
        var time = document.querySelector('#event-when-display time');
        time.removeAttribute('datetime');
      }
      removeDate();

      var scrapper = new MeetupScraper();
      var result = scrapper.scrap();

      assert.equal(result.success, false);
      assert.equal(result.event, undefined);
    }, done);
  });
});
