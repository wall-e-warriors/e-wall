import { processData } from './processor';

describe('response processor', () => {
  let sampleResponse = [
    { id: '001', date: '2019-08-01', description: 'Upcoming event' },
    { id: '002', date: '2019-06-29', description: 'Past event' },
    { id: '003', date: '2019-08-30', description: 'Future event' },
    { id: '004', date: '2019-07-30', description: 'Today event' },
    { id: '005', date: '2019-07-31', description: 'Tomorrow event' },
  ];

  let dateNowMockFn = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date(2019, 6, 30, 10, 0, 0));

  let result = processData(sampleResponse);
  dateNowMockFn.mockRestore();

  it('should add a parsed date entry to the response', () => {
    expect(result[0].parsedDate).not.toBeUndefined();
    expect(result[1].parsedDate).not.toBeUndefined();
    expect(result[2].parsedDate).not.toBeUndefined();
    expect(result[3].parsedDate).not.toBeUndefined();
  });

  it('should add in n days as reminderText to the response if the event is within next 10 days', () => {
    expect(result.find(i => i.id === '001').reminderText).toBe('in 2 days');
  });

  it('should add TODAY as reminderText to the response if the event is today', () => {
    expect(result.find(i => i.id === '004').reminderText).toBe('TODAY');
  });

  it('should add TOMORROW as reminderText to the response if the event is tomorrow', () => {
    expect(result.find(i => i.id === '005').reminderText).toBe('TOMORROW');
  });

  it('should not add a reminderText if the eventDate is beyond 10 days', () => {
    expect(result.find(i => i.id === '003').reminderText).toBeUndefined();
  });

  it('should filter out past events', () => {
    expect(result.find(i => i.id === '002')).toBeUndefined();
  });

  it('should sort the entries on the event date', () => {
    expect(result[0].id).toBe('004');
    expect(result[1].id).toBe('005');
    expect(result[2].id).toBe('001');
    expect(result[3].id).toBe('003');
  });
});
