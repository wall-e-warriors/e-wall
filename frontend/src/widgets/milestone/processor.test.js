import { processData } from './processor';

describe('response processor', () => {
  let sampleResponse = [
    { id: "003", date: "2019-08-30", description: "Futuristic event" },
    { id: "001", date: "2019-07-31", description: "Immediate event" },
    { id: "002", date: "2019-06-30", description: "Past event" }
  ];

  let dateNowMockFn = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date(2019, 6, 29));

  let result = processData(sampleResponse);
  dateNowMockFn.mockRestore();

  it('should add a parsed date entry to the response', () => {
    expect(result[0].parsedDate).not.toBeUndefined();
    expect(result[1].parsedDate).not.toBeUndefined();
  });

  it('should add a reminderText to the response if the event is within next 10 days', () => {
    expect(result.find(i => i.id === "001").reminderText).toBe("in 2 days");
  });

  it('should not add a reminderText if the eventDate is beyond 10 days', () => {
    expect(result.find(i => i.id === "003").reminderText).toBeUndefined()
  });

  it('should filter out past events', () => {
    expect(result.find(i => i.id === "002")).toBeUndefined()
  });

  it('should sort the entries on the event date', () => {
    expect(result[0].id).toBe("001");
    expect(result[1].id).toBe("003");
  });
});