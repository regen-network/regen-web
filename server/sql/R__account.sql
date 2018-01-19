CREATE OR REPLACE FUNCTION transfer(to_address text, amount bigint) returns boolean AS $$
DECLARE
  from_balance bigint := 0;
BEGIN
  SELECT balance FROM account INTO from_balance WHERE address = current_user;
  IF from_balance < amount THEN
    RETURN FALSE;
  ELSE
    UPDATE account SET balance = balance - amount WHERE address = current_user;
    INSERT INTO account (address, balance) VALUES (to_address, amount)
    ON CONFLICT (address) DO UPDATE SET balance = account.balance + amount;
    RETURN TRUE ;
  END IF ;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER ;
